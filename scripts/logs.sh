#!/usr/bin/env bash
# Niyodaya — follow the production log file.
cd "$(dirname "$0")/.."
touch niyodaya.log
echo "📄 Tailing niyodaya.log (Ctrl+C to stop)..."
tail -f niyodaya.log
