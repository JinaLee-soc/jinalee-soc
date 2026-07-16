#!/bin/zsh
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH:-}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is not available on PATH."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not available on PATH."
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
REPO_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_DIR"

if [[ ! -f "public/cv.docx" || ! -f "site-content.docx" ]]; then
  echo "Missing local source documents: public/cv.docx and site-content.docx are required."
  exit 1
fi

allowed_files=(
  "public/JinaLee_CV.pdf"
  "src/generated/cv-data.json"
)

content_changed=false

branch="$(git branch --show-current)"
if [[ "$branch" != "main" ]]; then
  echo "Refusing to push from branch '$branch'. Switch to main first."
  exit 1
fi

staged_before="$(git diff --cached --name-only)"
if [[ -n "$staged_before" ]]; then
  echo "There are already staged changes. Unstage or commit them first:"
  echo "$staged_before"
  exit 1
fi

echo "Updating main before generating public content..."
git pull --ff-only origin main

echo "Refreshing generated CV data..."
npm run generate:cv

if [[ "site-content.docx" -nt "src/generated/site-content.json" ]]; then
  content_changed=true
  echo "site-content.docx is newer; refreshing English and Korean site content..."
  npm run refresh:site-content
  allowed_files+=(
    "src/generated/site-content.json"
    "src/generated/site-content-ko.json"
    "scripts/cv/site_content_ko_auto_translations.json"
  )
else
  echo "site-content.docx is unchanged; keeping site-content payloads untouched."
fi

npm run check:content-sync
npm run build

git add -- "${allowed_files[@]}"

if git diff --cached --quiet -- "${allowed_files[@]}"; then
  if [[ "$content_changed" == true ]]; then
    echo "No CV or site-content changes to commit."
  else
    echo "No CV changes to commit."
  fi
  exit 0
fi

echo
echo "Committing these CV files:"
git diff --cached --name-only -- "${allowed_files[@]}"

commit_date="$(date +%Y-%m-%d)"
commit_subject="Update CV ${commit_date}"
if [[ "$content_changed" == true ]]; then
  commit_subject="Update CV and site content ${commit_date}"
fi
git commit -m "$commit_subject" -- "${allowed_files[@]}"

echo
echo "Pushing to origin main..."
git push origin main
