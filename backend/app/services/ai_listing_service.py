import json
import os
from urllib import request, error

from app.schemas.ai_listing import AIListingRequest, AIListingResponse


OPENAI_API_URL = "https://api.openai.com/v1/responses"


def generate_listing_text(
    payload: AIListingRequest,
) -> AIListingResponse:
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    prompt = f"""
Generate a professional real estate rental listing.

Return only raw JSON. Do not use markdown. Do not wrap in code block.

Required JSON format:
{{
  "title": "...",
  "description": "...",
  "short_marketing_text": "..."
}}

Language: {payload.language}
City: {payload.city}
Price: {payload.price}
Rooms: {payload.rooms}
Property type: {payload.property_type}
Features: {", ".join(payload.features) if payload.features else "not specified"}

Rules:
- Do not invent exact address.
- Do not mention unavailable facts.
- Keep title short.
- Make description clear and trustworthy.
- Avoid exaggerated claims.
"""

    body = {
        "model": "gpt-4o-mini",
        "input": prompt,
    }

    data = json.dumps(body).encode("utf-8")

    req = request.Request(
        OPENAI_API_URL,
        data=data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=20) as response:
            result = json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        raise RuntimeError(f"OpenAI API error: {exc.code}") from exc
    except error.URLError as exc:
        raise RuntimeError("OpenAI API unavailable") from exc

    try:
        output_text = result["output"][0]["content"][0]["text"]
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError("OpenAI response format is invalid") from exc

    output_text = output_text.strip()

    if output_text.startswith("```"):
        output_text = output_text.replace("```json", "")
        output_text = output_text.replace("```", "")
        output_text = output_text.strip()

    try:
        parsed = json.loads(output_text)
    except json.JSONDecodeError as exc:
        raise RuntimeError("OpenAI returned invalid JSON") from exc

    return AIListingResponse(
        title=parsed["title"],
        description=parsed["description"],
        short_marketing_text=parsed["short_marketing_text"],
    )
