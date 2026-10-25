# DuckBot OS Control Center

A combined home for Duckets' local command surfaces:

- **`duckbot-os/`** — the local-first DuckBot OS control plane. A dependency-free Node app that fronts Hermes, DuckBot RAG memory, and SystemOne's typed decisions behind one dashboard and a policy gate.
- **`juno-command-center/`** — the Juno Command Center fleet board. A Python-standard-library server with a React/TypeScript UI for live machine, model, training, storage, and render-lane status.
- **`master-dashboard/`** — the legacy MasterDashboard (:18798). Its source folder is missing from the Mac; only its LaunchAgent survives and is preserved there for the record.

The two apps remain independently runnable; this repository keeps their source together so the control-center work has one canonical home.

## Run DuckBot OS

```bash
cd duckbot-os
npm start
# http://127.0.0.1:4177
```

## Run Juno Command Center

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
