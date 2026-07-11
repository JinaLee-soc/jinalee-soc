from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

from openai import OpenAI


DEFAULT_AUTO_TRANSLATIONS_PATH = Path(
    "scripts/cv/site_content_ko_auto_translations.json"
)
DEFAULT_TRANSLATION_MODEL = "gpt-5.4-mini"


def load_auto_translations(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}

    payload: Any = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict) or not all(
        isinstance(source, str) and isinstance(translation, str)
        for source, translation in payload.items()
    ):
        raise ValueError(f"Invalid translation cache: {path}")
    return payload


def save_auto_translations(path: Path, translations: dict[str, str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = path.with_suffix(f"{path.suffix}.tmp")
    temporary_path.write_text(
        json.dumps(translations, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    temporary_path.replace(path)


def translate_prose(paragraphs: list[str], model: str) -> dict[str, str]:
    if not os.environ.get("OPENAI_API_KEY"):
        raise RuntimeError(
            "OPENAI_API_KEY is required to translate new or changed prose."
        )

    response = OpenAI().responses.create(
        model=model,
        input=[
            {
                "role": "system",
                "content": (
                    "Translate academic personal-website prose from English to natural, "
                    "polished Korean. Preserve names, publication titles, official course "
                    "names, journal names, acronyms, and technical terms when translating "
                    "them would reduce precision. Use a professional first-person voice. "
                    "Return only a JSON array whose objects have exactly two string fields: "
                    '"source" and "translation".'
                ),
            },
            {
                "role": "user",
                "content": json.dumps(paragraphs, ensure_ascii=False),
            },
        ],
    )

    try:
        payload: Any = json.loads(response.output_text)
    except json.JSONDecodeError as error:
        raise ValueError("Translation model returned invalid JSON.") from error

    if not isinstance(payload, list):
        raise ValueError("Translation model did not return a JSON array.")

    translations: dict[str, str] = {}
    for item in payload:
        if not isinstance(item, dict):
            raise ValueError("Translation model returned an invalid array item.")
        source = item.get("source")
        translation = item.get("translation")
        if not isinstance(source, str) or not isinstance(translation, str):
            raise ValueError("Translation model returned a malformed translation pair.")
        translations[source] = translation.strip()

    missing = [paragraph for paragraph in paragraphs if not translations.get(paragraph)]
    unexpected = [source for source in translations if source not in paragraphs]
    if missing or unexpected:
        raise ValueError(
            "Translation response did not match the requested paragraphs. "
            f"Missing: {missing}; unexpected: {unexpected}"
        )
    return translations
