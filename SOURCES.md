# Sources combined in this repository

Snapshot created 2026-10-25.

## DuckBot OS

- Path: `duckbot-os/`
- Source checkout: `~/duckbot-os` on the Mac Studio
- Source branch: `main`
- Source commit: `72ef5912` — "Fix dead sidebar tabs: add Brain and Automation panels, wire nav smooth-scroll + scrollspy, SystemOne decide tester"
- Included: the tracked source files from that commit. Local `.bak-*` files were not included.

## Juno Command Center

- Path: `juno-command-center/`
- Source checkout: `~/command-center` on the Mac Studio
- Source branch: `main`
- Source commit: `bd4baa5` — "Storage watch: parallel du with 900s timeout (big Sabrent trees, iCloud stalls)"
- Prior home: `Franzferdinan51/The-Sparky-Command-Center`
- Included: the tracked source files and built web UI from that commit.
- Not included: live `config.json`, `.env`, runtime data, logs, or generated PWA PNG icons that were untracked binary files in the working checkout.

## MasterDashboard (legacy)

- Path: `master-dashboard/`
- Source checkout: `~/Desktop/MasterDashboard` on the Mac Studio — **missing** as of 2026-10-25 (searched the home folder, Spotlight, mounted volumes, and GitHub code search).
- Preserved: only its LaunchAgent, `com.duckbot.masterdashboard.plist` (Node `dashboard/server.js`, port 18798), copied from `~/Library/LaunchAgents/`.
