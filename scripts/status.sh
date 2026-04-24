#!/usr/bin/env bash
# Niyodaya — report whether the background server is running.
cd "$(dirname "$0")/.."

PID_FILE=".niyodaya.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "⏸  Not running (no .niyodaya.pid file)"
  exit 0
fi

PID=$(cat "$PID_FILE")
if kill -0 "$PID" 2>/dev/null; then
  echo "✅ Running.  PID=$PID"
  ss -ltnp 2>/dev/null | grep -E "pid=$PID" || true
  echo "   Logs: tail -f niyodaya.log"
else
  echo "⚠️  PID $PID is not alive but .niyodaya.pid still exists — stale."
  echo "   Remove it with:  rm .niyodaya.pid"
fi
