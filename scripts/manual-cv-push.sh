#!/bin/zsh
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH:-}"

REPO_DIR="/Users/jinalee/Library/CloudStorage/Dropbox/Professional Website"
cd "$REPO_DIR"

allowed_files=(
  "public/cv.docx"
  "public/JinaLee_CV.pdf"
  "src/generated/cv-data.json"
)

if [[ -f "cv.docx" ]]; then
  allowed_files+=("cv.docx")
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is not available on PATH."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not available on PATH."
  exit 1
fi

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

echo "Refreshing generated CV data..."
npm run generate:cv

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
