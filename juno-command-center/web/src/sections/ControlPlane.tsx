import { useState, type FormEvent } from 'react'
import { useDash } from '../lib/store'
import { Chip, Empty, KV, Panel } from '../components/Panel'
import { postDecide } from '../lib/api'

// DuckBot OS, folded into the Command Center (2026-10-25): the control plane —
// connected layers, the agent fleet, the policy gate, and the Brain's SystemOne
// decide tester — living in this board's design instead of a second dashboard.

const statusChip = (s: string) =>
  s === 'connected' || s === 'configured' ? <Chip tone="good">{s.toUpperCase()}</Chip>
  : s === 'missing' ? <Chip tone="bad">{s.toUpperCase()}</Chip>
  : <Chip tone="amber">{s.toUpperCase()}</Chip>

export function ControlPlane() {
  const { duckbot } = useDash()
  const [q, setQ] = useState('')
  const [out, setOut] = useState('Typed decisions, policy-checked. This panel only asks — nothing executes from here.')
  const [busy, setBusy] = useState(false)
  if (!duckbot) return <Empty>Waiting for the control plane...</Empty>
  const l = duckbot.layers

  const decide = async (e: FormEvent) => {
    e.preventDefault()
    const v = q.trim()
    if (!v || busy) return
    setBusy(true)
    setOut('asking SystemOne…')
    const r = await postDecide(v)
    setOut(r.data ? JSON.stringify(r.data, null, 2) : `SystemOne unreachable (HTTP ${r.status || 'network error'})`)
    setBusy(false)
  }

  return (
    <div className="fleet">
      <div className="cards cards--2">
        <Panel id="card-layers" title={<span>Connected layers</span>} chips={<Chip tone="muted">{duckbot.mode}</Chip>}>
          <KV k="Hermes">{l.hermes.model} {statusChip(l.hermes.status)}{l.hermes.gateway ? ` · gateway ${l.hermes.gateway}` : ''}{l.hermes.webui ? ` · webui ${l.hermes.webui}` : ''}</KV>
          <KV k="DuckBot RAG">{l.rag.path} {statusChip(l.rag.status)}</KV>
          <KV k="SystemOne">{l.systemOne.mode}{l.systemOne.model ? ` · ${l.systemOne.model}` : ''} {statusChip(l.systemOne.status)}</KV>
          <KV k="OpenCode">{l.opencode.localProviders} local provider(s) · Zen {l.opencode.zenConfigured ? 'configured' : 'not in local config'} {statusChip(l.opencode.status)}</KV>
          {l.systemOne.reason && <KV k="SystemOne note">{l.systemOne.reason}</KV>}
        </Panel>
        <Panel id="card-agentfleet" title={<span>Agent fleet</span>} chips={<Chip tone="good">POLICY-GATED</Chip>}>
          {duckbot.fleet.map(a => (
            <KV key={a.name} k={a.name}>{a.role} · {a.state} · {a.risk}</KV>
          ))}
        </Panel>
      </div>
      <div className="cards cards--2">
        <Panel id="card-policy" title={<span>Security &amp; approvals</span>} chips={<Chip tone="good">FAIL-CLOSED</Chip>}>
          <KV k="Read-only inspection"><Chip tone="good">AUTOMATIC</Chip></KV>
          <KV k="Reversible changes"><Chip tone="amber">PLAN FIRST</Chip></KV>
          <KV k="External / destructive"><Chip tone="bad">APPROVAL</Chip></KV>
          <KV k="Approvals pending">{duckbot.approvals.pending}</KV>
          <KV k="Policy">{duckbot.approvals.policy}</KV>
        </Panel>
        <Panel id="card-automation" title={<span>Automation</span>}>
          <KV k="Scheduled jobs discovered">{duckbot.automation.jobs}</KV>
          <KV k="Cron policy">{duckbot.automation.policy}</KV>
          <KV k="Mode">{duckbot.mode}</KV>
          <KV k="Version">DuckBot OS {duckbot.version}</KV>
        </Panel>
      </div>
      <div className="cards cards--1">
        <Panel id="card-brain" title={<span>DuckBot Brain — ask SystemOne</span>} chips={<Chip tone="violet">D1</Chip>} className="card--wide">
          <form className="decide" onSubmit={decide}>
            <input className="field" value={q} onChange={e => setQ(e.target.value)} placeholder="Ask SystemOne to decide something…" aria-label="Ask SystemOne to decide something" />
            <button type="submit" className="btn btn--primary" disabled={busy}>{busy ? '…' : 'Decide →'}</button>
          </form>
          <pre className="decide__out mono">{out}</pre>
        </Panel>
      </div>
    </div>
  )
}
