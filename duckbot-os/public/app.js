const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// --- Sidebar nav: smooth scroll + active state + scrollspy ---
const links = [...document.querySelectorAll('nav a')];
function setActive(a) { links.forEach(x => x.classList.toggle('active', x === a)); }
links.forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(a); }
}));
const spy = new IntersectionObserver(es => {
  es.forEach(en => {
    if (en.isIntersecting) {
      const a = links.find(x => x.getAttribute('href') === '#' + en.target.id);
      if (a) setActive(a);
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
['command', 'brain', 'fleet', 'systems', 'automation', 'models', 'security'].forEach(id => {
  const el = document.getElementById(id);
  if (el) spy.observe(el);
});

// --- SystemOne decide tester (Brain panel) ---
const decideForm = $('#decideForm');
if (decideForm) decideForm.addEventListener('submit', async e => {
  e.preventDefault();
  const q = $('#decideInput').value.trim();
  if (!q) return;
  const out = $('#decideOut');
  out.textContent = 'asking SystemOne…';
  try {
    const r = await fetch('/api/systemone/decide', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: q, query: q })
    });
    out.textContent = JSON.stringify(await r.json(), null, 2);
  } catch (err) { out.textContent = 'SystemOne unreachable: ' + err; }
});

// --- Overview loader ---
async function load() {
  try {
    const d = await fetch('/api/overview').then(r => r.json());
    $('#health').textContent = 'SYSTEM ONLINE';
    $('#mode').textContent = d.mode.toUpperCase();
    $('#fleetCount').textContent = d.fleet.length;
    $('#ragStatus').textContent = d.layers.rag.status === 'connected' ? 'ONLINE' : 'OFFLINE';
    $('#jobCount').textContent = d.automation.jobs;
    $('#approvalCount').textContent = d.approvals.pending;
    $('#hermesModel').textContent = d.layers.hermes.model;
    $('#zenState').textContent = d.layers.opencode.zenConfigured ? 'configured' : 'not in local config';
    $('#zenState').className = d.layers.opencode.zenConfigured ? 'ok' : 'warn';
    $('#fleetList').innerHTML = d.fleet.map(a => `<div class="agent"><i class="dot"></i><b>${esc(a.name)}</b><span>${esc(a.role)} · ${esc(a.state)}</span></div>`).join('');
    const l = d.layers;
    $('#layers').innerHTML = [['Hermes', l.hermes.status, l.hermes.model], ['DuckBot RAG', l.rag.status, l.rag.path], ['SystemOne', l.systemOne.status, l.systemOne.mode], ['OpenCode', l.opencode.status, l.opencode.localProviders + ' local provider(s)']].map(x => `<div class="layer"><b>${esc(x[0])}</b><span>${esc(x[1])} · ${esc(x[2])}</span></div>`).join('');
    // Brain panel
    $('#brainRag').textContent = l.rag.path;
    const brs = $('#brainRagState');
    brs.textContent = l.rag.status.toUpperCase();
    brs.className = l.rag.status === 'connected' ? 'ok' : 'danger';
    $('#brainSO').textContent = l.systemOne.mode + (l.systemOne.model ? ' · ' + l.systemOne.model : '');
    const bso = $('#brainSOState');
    bso.textContent = l.systemOne.status.toUpperCase();
    bso.className = l.systemOne.status === 'connected' ? 'ok' : 'warn';
    // Automation panel
    $('#autoJobs').textContent = d.automation.jobs;
    $('#autoPolicy').textContent = d.automation.policy.toUpperCase();
    $('#autoApprovals').textContent = d.approvals.pending;
    $('#autoNote').textContent = d.approvals.policy;
    $('#updated').textContent = 'overview refreshed ' + new Date().toLocaleTimeString();
  } catch (e) {
    $('#health').textContent = 'OFFLINE';
    $('#health').style.color = 'var(--red)';
    $('#updated').textContent = 'API unavailable';
  }
}
load();
setInterval(load, 15000);
