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
  "src/generated/site-content.json"
)

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
npm run refresh:content
npm run build

git add -- "${allowed_files[@]}"

if git diff --cached --quiet -- "${allowed_files[@]}"; then
  echo "No CV changes to commit."
  exit 0
fi

echo
echo "Committing these CV files:"
git diff --cached --name-only -- "${allowed_files[@]}"

commit_date="$(date +%Y-%m-%d)"
git commit -m "Update CV ${commit_date}" -- "${allowed_files[@]}"

echo
echo "Pushing to origin main..."
git push origin main
