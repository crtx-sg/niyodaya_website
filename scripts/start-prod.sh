#!/usr/bin/env bash
# ---------------------------------------------------------
# Niyodaya — start the built site in the BACKGROUND
# Usage: bash scripts/start-prod.sh [PORT]
# Default PORT = 3000.
# Writes the PID to  .niyodaya.pid  and logs to  niyodaya.log
# ---------------------------------------------------------

set -e
cd "$(dirname "$0")/.."

PORT="${1:-${PORT:-3000}}"
PID_FILE=".niyodaya.pid"
LOG_FILE="niyodaya.log"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "⚠️  Already running — PID $(cat $PID_FILE) on whatever port it was started with."
  echo "   Stop it first:  bash scripts/stop-prod.sh"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies..."
  npm install --no-audit --no-fund
fi

if [ ! -d build ]; then
  echo "🔨 Building production bundle..."
  npm run build
fi

# Load .env if present so SMTP / Razorpay / Insforge / ADMIN_* values are picked up
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

echo "🚀 Starting Niyodaya on port $PORT (background)..."
PORT="$PORT" HOST=0.0.0.0 nohup node build/index.js >> "$LOG_FILE" 2>&1 &
NEW_PID=$!
disown "$NEW_PID" 2>/dev/null || true
echo "$NEW_PID" > "$PID_FILE"

sleep 1
if kill -0 "$NEW_PID" 2>/dev/null; then
  echo "✅ Running.  PID=$NEW_PID   URL=http://localhost:$PORT"
  echo "   Logs:  tail -f niyodaya.log"
  echo "   Stop:  bash scripts/stop-prod.sh"
else
  echo "❌ Server didn't start — tail of $LOG_FILE follows:"
  tail -n 20 "$LOG_FILE"
  rm -f "$PID_FILE"
  exit 1
fi
