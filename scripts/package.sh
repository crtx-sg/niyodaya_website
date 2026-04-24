#!/usr/bin/env bash
# ---------------------------------------------------------
# Niyodaya — build a deployment tarball for first public
# testing. Excludes node_modules, build output, .env,
# local uploads, and anything caching-related.
#
# Output:  dist/niyodaya-website-<timestamp>.tar.gz
# ---------------------------------------------------------

set -e
cd "$(dirname "$0")/.."

STAMP=$(date +%Y%m%d-%H%M%S)
OUT_DIR="dist"
OUT_FILE="$OUT_DIR/niyodaya-website-$STAMP.tar.gz"
mkdir -p "$OUT_DIR"

echo "📦 Packaging Niyodaya website v$STAMP..."

# Use tar with explicit exclusions so we stay portable across BSD/GNU tar
tar \
  --exclude='./node_modules' \
  --exclude='./build' \
  --exclude='./.svelte-kit' \
  --exclude='./dist' \
  --exclude='./.env' \
  --exclude='./.env.*' \
  --exclude='./niyodaya.log' \
  --exclude='./.niyodaya.pid' \
  --exclude='./static/gallery/uploads/*' \
  --exclude='./.git' \
  --exclude='./vite.config.js.timestamp-*' \
  --exclude='.DS_Store' \
  -czf "$OUT_FILE" \
  --transform='s,^\./,niyodaya-website/,' \
  ./README.md ./DEPLOYMENT.md ./CONTENT_GUIDE.md \
  ./.env.example ./.gitignore ./jsconfig.json \
  ./package.json ./package-lock.json \
  ./svelte.config.js ./vite.config.js \
  ./start.sh ./start.bat \
  ./src ./static ./scripts \
  2>/dev/null

SIZE=$(du -h "$OUT_FILE" | cut -f1)
echo ""
echo "✅ Done."
echo "   File: $OUT_FILE   ($SIZE)"
echo ""
echo "   To deploy on a server:"
echo "     1. Copy the tarball to the server:   scp $OUT_FILE user@host:~"
echo "     2. On the server:"
echo "          tar xzf $(basename "$OUT_FILE")"
echo "          cd niyodaya-website"
echo "          cp .env.example .env    # then edit .env with real secrets"
echo "          bash scripts/start-prod.sh"
echo ""
