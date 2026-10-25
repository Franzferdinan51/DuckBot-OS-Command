# Sources combined in this repository

Snapshot created 2026-10-25.

## DuckBot OS

- Path: `duckbot-os/`
- Source checkout: `~/duckbot-os` on the Mac Studio
- Source branch: `main`
- Source commit: `cd8ec553` — "Shim URL port fix 8765 → 8766" (2026-10-25), on top of `72ef5912`.
- Included: the tracked source files from that commit. Local `.bak-*` files were not included.

## Juno Command Center — now the ONE dashboard

- Path: `juno-command-center/`
- Source checkout: `~/command-center` on the Mac Studio
- Source branch: `main`
- Source commit: `6784d56` — "SystemOne fix: shim port 8765 → 8766; Brain decide proxy translation" (2026-10-25). Only the quick DEFCON posture card is on this board; AI Shield stays in its own app.
- Prior home: `Franzferdinan51/The-Sparky-Command-Center`
- **The merge:** DuckBot OS's control plane now lives inside this app — server-side `/api/duckbot` + `/api/duckbot/decide` (SystemOne shim proxy) in `server.py`, and a "Control plane" board module (`web/src/sections/ControlPlane.tsx`: connected layers, agent fleet, policy gate, automation, Brain decide tester) in this board's design. The standalone DuckBot OS server on :4177 was retired the same day; the unified dashboard runs on **:8895**.
- Included: the tracked source files and built web UI from that commit.
- Not included: live `config.json`, `.env`, runtime data, logs, or the PWA PNG icons (binary; the text-only snapshot route cannot carry them — they live in the Mac checkout under `web/public/` and `web/dist/`).

## MasterDashboard (legacy)

- Path: `master-dashboard/`
- Source checkout: `~/Desktop/MasterDashboard` on the Mac Studio — **missing** as of 2026-10-25 (searched the home folder, Spotlight, mounted volumes, and GitHub code search).
- Preserved: only its LaunchAgent, `com.duckbot.masterdashboard.plist` (Node `dashboard/server.js`, port 18798), copied from `~/Library/LaunchAgents/`.
