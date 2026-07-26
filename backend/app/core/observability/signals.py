import logging

logger = logging.getLogger("rento.observability")

SIGNAL_TRANSITION = "transition"
SIGNAL_DECISION = "decision"
SIGNAL_FAILURE = "failure"
SIGNAL_UPLOAD = "upload"
SIGNAL_PRIVILEGED = "privileged"


def _format_fields(**fields: object) -> str:
    parts = []

    for key, value in fields.items():
        if value is not None:
            parts.append(f"{key}={value}")

    return " ".join(parts)


def emit_transition_signal(
    entity_type: str,
    entity_id: int,
    from_status: str | None,
    to_status: str,
    *,
    actor_user_id: int | None = None,
) -> None:
    logger.info(
        "signal=%s %s",
        SIGNAL_TRANSITION,
        _format_fields(
            entity_type=entity_type,
            entity_id=entity_id,
            from_status=from_status,
            to_status=to_status,
            actor_user_id=actor_user_id,
        ),
    )


def emit_decision_signal(
    decision_class: str,
    outcome: str,
    *,
    actor_user_id: int | None = None,
    reason_code: str | None = None,
) -> None:
    logger.info(
        "signal=%s %s",
        SIGNAL_DECISION,
        _format_fields(
            decision_class=decision_class,
            outcome=outcome,
            actor_user_id=actor_user_id,
            reason_code=reason_code,
        ),
    )


def emit_failure_signal(
    failure_class: str,
    *,
    path: str | None = None,
    status_code: int | None = None,
) -> None:
    logger.warning(
        "signal=%s %s",
        SIGNAL_FAILURE,
        _format_fields(
            failure_class=failure_class,
            path=path,
            status_code=status_code,
        ),
    )


def emit_upload_signal(
    outcome: str,
    *,
    actor_user_id: int | None = None,
    reason_code: str | None = None,
    file_ref: str | None = None,
) -> None:
    logger.info(
        "signal=%s %s",
        SIGNAL_UPLOAD,
        _format_fields(
            outcome=outcome,
            actor_user_id=actor_user_id,
            reason_code=reason_code,
            file_ref=file_ref,
        ),
    )


def emit_privileged_signal(
    action: str,
    *,
    actor_user_id: int,
    target_type: str,
    target_id: int,
    outcome: str,
) -> None:
    logger.info(
        "signal=%s %s",
        SIGNAL_PRIVILEGED,
        _format_fields(
            action=action,
            actor_user_id=actor_user_id,
            target_type=target_type,
            target_id=target_id,
            outcome=outcome,
        ),
    )
