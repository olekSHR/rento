#!/usr/bin/env bash
# Preserve rollback Docker images before an application deployment rebuild.
# Tags current rento-backend:latest and rento-frontend:latest as:
#   rento-backend:rollback-<APP_SHA_SHORT>
#   rento-frontend:rollback-<APP_SHA_SHORT>

set -euo pipefail

readonly BACKEND_REPO="rento-backend"
readonly FRONTEND_REPO="rento-frontend"
readonly BACKEND_SOURCE="${BACKEND_REPO}:latest"
readonly FRONTEND_SOURCE="${FRONTEND_REPO}:latest"

fail() {
  printf '[rento-preserve-rollback] ERROR: %s\n' "$*" >&2
  exit 1
}

usage() {
  printf 'Usage: %s <APP_DEPLOY_SHA>\n' "$(basename "$0")" >&2
  printf '  APP_DEPLOY_SHA: 40-character hexadecimal Git commit SHA of the currently running application release.\n' >&2
  exit 1
}

normalize_sha() {
  local sha="$1"

  if [[ ! "${sha}" =~ ^[0-9a-fA-F]{40}$ ]]; then
    fail "invalid APP_DEPLOY_SHA: expected 40-character hexadecimal Git SHA"
  fi

  printf '%s' "${sha,,}"
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "required command not found: $1"
}

image_id_for_ref() {
  local ref="$1"

  docker image inspect --format '{{.Id}}' "${ref}" 2>/dev/null || true
}

check_destination_tag() {
  local dest_tag="$1"
  local source_id="$2"
  local label="$3"
  local existing_id

  existing_id="$(image_id_for_ref "${dest_tag}")"
  if [[ -z "${existing_id}" ]]; then
    return 0
  fi

  if [[ "${existing_id}" == "${source_id}" ]]; then
    return 0
  fi

  fail "${label} rollback tag ${dest_tag} already exists and points to ${existing_id}, expected ${source_id}"
}

main() {
  local app_sha app_sha_short
  local backend_source_id frontend_source_id
  local backend_tag frontend_tag
  local backend_dest_id frontend_dest_id

  if [[ $# -eq 0 ]]; then
    usage
  fi

  if [[ $# -gt 1 ]]; then
    fail "unexpected arguments: expected exactly one APP_DEPLOY_SHA"
  fi

  app_sha="$(normalize_sha "$1")"
  app_sha_short="${app_sha:0:7}"

  require_command docker

  backend_source_id="$(image_id_for_ref "${BACKEND_SOURCE}")"
  [[ -n "${backend_source_id}" ]] || fail "source image not found: ${BACKEND_SOURCE}"

  frontend_source_id="$(image_id_for_ref "${FRONTEND_SOURCE}")"
  [[ -n "${frontend_source_id}" ]] || fail "source image not found: ${FRONTEND_SOURCE}"

  backend_tag="${BACKEND_REPO}:rollback-${app_sha_short}"
  frontend_tag="${FRONTEND_REPO}:rollback-${app_sha_short}"

  check_destination_tag "${backend_tag}" "${backend_source_id}" "backend"
  check_destination_tag "${frontend_tag}" "${frontend_source_id}" "frontend"

  backend_dest_id="$(image_id_for_ref "${backend_tag}")"
  if [[ "${backend_dest_id}" != "${backend_source_id}" ]]; then
    docker tag "${BACKEND_SOURCE}" "${backend_tag}"
  fi

  frontend_dest_id="$(image_id_for_ref "${frontend_tag}")"
  if [[ "${frontend_dest_id}" != "${frontend_source_id}" ]]; then
    docker tag "${FRONTEND_SOURCE}" "${frontend_tag}"
  fi

  backend_dest_id="$(image_id_for_ref "${backend_tag}")"
  frontend_dest_id="$(image_id_for_ref "${frontend_tag}")"

  [[ "${backend_source_id}" == "${backend_dest_id}" ]] \
    || fail "backend verification failed: source ${backend_source_id} != tag ${backend_dest_id}"
  [[ "${frontend_source_id}" == "${frontend_dest_id}" ]] \
    || fail "frontend verification failed: source ${frontend_source_id} != tag ${frontend_dest_id}"

  printf 'Rollback images preserved:\n'
  printf 'application_sha=%s\n' "${app_sha}"
  printf 'backend_source=%s\n' "${backend_source_id}"
  printf 'backend_tag=%s\n' "${backend_tag}"
  printf 'frontend_source=%s\n' "${frontend_source_id}"
  printf 'frontend_tag=%s\n' "${frontend_tag}"
}

main "$@"
