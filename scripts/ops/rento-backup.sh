#!/usr/bin/env bash
# Rento production backup — PostgreSQL logical dump + uploads archive.
# Automated checkpoints: /opt/rento-backups/automated/<UTC>/
# Manual checkpoints under /opt/rento-backups/manual/ are never modified.

set -euo pipefail

readonly PROJECT_PATH="/opt/rento"
readonly COMPOSE_FILE="${PROJECT_PATH}/docker-compose.yml"
readonly COMPOSE=(docker compose -f "${COMPOSE_FILE}")
readonly UPLOADS_SRC="${PROJECT_PATH}/backend/uploads"
readonly BACKUP_ROOT="/opt/rento-backups"
readonly AUTOMATED_ROOT="${BACKUP_ROOT}/automated"
readonly RETENTION_COUNT=14
readonly MIN_FREE_KB=524288 # 512 MiB
readonly POSTGRES_IMAGE="postgres:16"

log() {
  printf '[rento-backup] %s\n' "$*"
}

fail() {
  log "ERROR: $*"
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "required command not found: $1"
}

bytes_free_on_backup_filesystem() {
  df -Pk "${BACKUP_ROOT}" | awk 'NR==2 { print $4 }'
}

db_container_healthy() {
  local status
  status="$("${COMPOSE[@]}" ps --status running --format '{{.Service}} {{.Health}}' db 2>/dev/null | awk '$1=="db"{print $2}')"
  [[ "${status:-}" == "healthy" ]]
}

cleanup_failed_workdir() {
  local work_dir="$1"
  if [[ -d "${work_dir}" ]]; then
    local failed_dir="${work_dir/.work-/.failed-}"
    mv "${work_dir}" "${failed_dir}" 2>/dev/null || true
    chmod 700 "${failed_dir}" 2>/dev/null || true
    log "left failed backup artifacts at ${failed_dir}"
  fi
}

prune_old_automated_backups() {
  local -a complete_dirs=()
  local dir count remove

  shopt -s nullglob
  for dir in "${AUTOMATED_ROOT}"/*/; do
    [[ -f "${dir}/.complete" ]] || continue
    complete_dirs+=("${dir%/}")
  done
  shopt -u nullglob

  count="${#complete_dirs[@]}"
  if (( count <= RETENTION_COUNT )); then
    log "retention: keeping ${count}/${RETENTION_COUNT} automated backups"
    return 0
  fi

  mapfile -t complete_dirs < <(printf '%s\n' "${complete_dirs[@]}" | sort -r)
  remove=$((count - RETENTION_COUNT))
  for ((i = RETENTION_COUNT; i < count; i++)); do
    log "retention: removing ${complete_dirs[i]}"
    rm -rf "${complete_dirs[i]}"
  done
  log "retention: removed ${remove} old automated backup(s)"
}

main() {
  local timestamp work_dir final_dir upload_source_count git_commit alembic_revision

  require_command docker
  require_command tar
  require_command sha256sum
  require_command find
  require_command awk
  require_command df

  [[ -d "${PROJECT_PATH}" ]] || fail "project path not found: ${PROJECT_PATH}"
  [[ -f "${COMPOSE_FILE}" ]] || fail "compose file not found: ${COMPOSE_FILE}"
  [[ -d "${UPLOADS_SRC}" ]] || fail "uploads path not found: ${UPLOADS_SRC}"

  mkdir -p "${AUTOMATED_ROOT}"
  chmod 755 "${BACKUP_ROOT}" "${AUTOMATED_ROOT}" 2>/dev/null || true

  local free_kb
  free_kb="$(bytes_free_on_backup_filesystem)"
  (( free_kb >= MIN_FREE_KB )) || fail "insufficient disk space: ${free_kb} KiB free, need ${MIN_FREE_KB} KiB"

  db_container_healthy || fail "db container is not healthy"

  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  work_dir="${AUTOMATED_ROOT}/.work-${timestamp}"
  final_dir="${AUTOMATED_ROOT}/${timestamp}"

  mkdir -p "${work_dir}"
  chmod 700 "${work_dir}"
  log "starting backup work_dir=${work_dir}"

  trap 'cleanup_failed_workdir "${work_dir}"' ERR

  upload_source_count="$(find "${UPLOADS_SRC}" -type f 2>/dev/null | wc -l | tr -d ' ')"
  log "upload_source_file_count=${upload_source_count}"

  "${COMPOSE[@]}" exec -T db pg_dump -U rento_user -d rento_db --format=custom >"${work_dir}/postgres.dump"
  [[ -s "${work_dir}/postgres.dump" ]] || fail "postgres.dump is empty"

  tar -czf "${work_dir}/uploads.tar.gz" -C "${PROJECT_PATH}/backend" uploads
  [[ -s "${work_dir}/uploads.tar.gz" ]] || fail "uploads.tar.gz is empty"

  git_commit="$(git -C "${PROJECT_PATH}" rev-parse HEAD 2>/dev/null || echo unknown)"
  alembic_revision="$("${COMPOSE[@]}" exec -T backend alembic current 2>&1 | tail -1 | tr -d '\r')"

  cat >"${work_dir}/backup-metadata.txt" <<EOF
backup_timestamp_utc=${timestamp}
host=$(hostname)
project_path=${PROJECT_PATH}
git_commit=${git_commit}
alembic_revision=${alembic_revision}
upload_source_file_count=${upload_source_count}
postgres_dump_format=custom
backup_mode=automated
EOF

  (
    cd "${work_dir}"
    sha256sum postgres.dump uploads.tar.gz >SHA256SUMS
  )

  docker run --rm -v "${work_dir}:/backup:ro" "${POSTGRES_IMAGE}" \
    pg_restore --list /backup/postgres.dump >/dev/null

  tar -tzf "${work_dir}/uploads.tar.gz" >/dev/null

  (
    cd "${work_dir}"
    sha256sum -c SHA256SUMS >/dev/null
  )

  : >"${work_dir}/.complete"
  mv "${work_dir}" "${final_dir}"
  trap - ERR

  log "backup completed final_dir=${final_dir}"
  log "postgres.dump bytes=$(wc -c <"${final_dir}/postgres.dump" | tr -d ' ')"
  log "uploads.tar.gz bytes=$(wc -c <"${final_dir}/uploads.tar.gz" | tr -d ' ')"

  prune_old_automated_backups
}

main "$@"
