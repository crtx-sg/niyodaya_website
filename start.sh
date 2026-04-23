#!/usr/bin/env bash
# One-click start for macOS / Linux.
# Double-click this file (or run: bash start.sh) to launch the Niyodaya site locally.
#
# Needs Node.js 18+ installed (https://nodejs.org).

set -e

cd "$(dirname "$0")"

echo ""
echo "=========================================="
echo " Niyodaya Foundation - local dev server  "
echo "=========================================="
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js is not installed."
  echo "   Please install Node 18+ from https://nodejs.org and try again."
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "⚠️  Found Node $NODE_MAJOR — this site needs Node 18 or newer."
  echo "   Please upgrade from https://nodejs.org"
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (first-time only — takes a minute or two)..."
  npm install
  echo ""
fi

echo "🚀 Starting the Niyodaya site..."
echo "   Open http://localhost:5173 in your browser."
echo "   Press Ctrl+C in this window to stop the server."
echo ""

npm run dev
