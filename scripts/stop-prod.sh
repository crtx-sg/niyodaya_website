#!/usr/bin/env bash
# Niyodaya — stop the background production server.
set -e
cd "$(dirname "$0")/.."

PID_FILE=".niyodaya.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "ℹ️  No PID file found (nothing to stop?). If a stray node is running,"
  echo "   find it with:  ps aux | grep 'node build'"
  exit 0
fi

PID=$(cat "$PID_FILE")
if kill -0 "$PID" 2>/dev/null; then
  echo "🛑 Stopping PID $PID..."
  kill "$PID"
  sleep 1
  kill -0 "$PID" 2>/dev/null && kill -9 "$PID" 2>/dev/null || true
  echo "✅ Stopped."
else
  echo "ℹ️  PID $PID is not running anymore."
fi
rm -f "$PID_FILE"
