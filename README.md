# DuckBot OS Control Center

One dashboard, one home. As of 2026-10-25 the dashboards are **merged into a single app**: the Juno Command Center (Duckets' favorite design) now contains the DuckBot OS control plane — connected layers, agent fleet, policy gate, automation, and the Brain's SystemOne decide tester — as its "Control plane" module. The standalone DuckBot OS page was retired; there is one dashboard, on **:8895**.

- **`juno-command-center/`** — THE dashboard. A Python-standard-library server with a React/TypeScript UI: live machine, model, training, storage, and render-lane status, plus the DuckBot OS control plane.
- **`duckbot-os/`** — the original standalone DuckBot OS Node app, kept as the reference source the control plane was folded from. No longer run separately.
- **`master-dashboard/`** — the legacy MasterDashboard (:18798). Its source folder is missing from the Mac; only its LaunchAgent survives and is preserved there for the record.

## Run the dashboard

```bash
cd juno-command-center
cp config.example.json config.json   # edit for the local fleet
python3 server.py
# http://127.0.0.1:8895
```

The built web UI is included under `juno-command-center/web/dist/`. Node is only needed there when changing and rebuilding the React UI.

## Configuration and safety

Real local configuration is intentionally not committed. In particular, Juno Command Center's live `config.json`, `.env`, runtime data, logs, and credentials stay on the machine that runs it. Use the included example files as templates.

DuckBot OS is local-first and fail-closed by design: read-only inspection can run automatically; destructive, external, SSH, or money-moving actions require explicit approval.

## Provenance

See [`SOURCES.md`](SOURCES.md) for the source checkouts and commits combined into this repository.
