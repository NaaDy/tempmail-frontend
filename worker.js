import PostalMime from 'postal-mime';

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="monetag" content="369e8912fe05b52ce220425e1c2fa23d">
  <title>TempMail — Disposable Email</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { 50:'#eef2ff',100:'#e0e7ff',500:'#6366f1',600:'#4f46e5',700:'#4338ca' }
          },
          fontFamily: { sans: ['Inter','system-ui','sans-serif'] }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; }
    .fade-in { animation: fadeIn .3s ease-in; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen text-slate-100">
  <header class="border-b border-white/5">
    <div class="max-w-3xl mx-auto px-4 py-5 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
        <svg class="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      <div>
        <h1 class="text-lg font-bold tracking-tight">TempMail</h1>
        <p class="text-xs text-slate-400">Disposable email — no signup needed</p>
      </div>
    </div>
  </header>
  <main class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <section class="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
      <label class="text-sm font-medium text-slate-400 mb-2 block">Your temporary email address</label>
      <div class="flex items-center gap-2">
        <div class="flex-1 flex items-center bg-slate-900/60 rounded-xl overflow-hidden">
          <input id="email-prefix" type="text" placeholder="type-a-name" autocomplete="off" autocapitalize="off" spellcheck="false" class="flex-1 bg-transparent px-4 py-3 text-lg font-mono text-brand-300 outline-none placeholder-slate-600 min-w-0" />
        </div>
        <button id="copy-btn" onclick="copyEmail()" class="shrink-0 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 transition text-white font-medium flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span id="copy-label">Copy</span>
        </button>
        <button id="generate-btn" onclick="generateRandom()" class="shrink-0 px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 transition text-white font-medium flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>Random</span>
        </button>
      </div>
      <div class="mt-4 flex items-center gap-3 text-sm">
        <button id="check-btn" onclick="checkInbox()" class="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1.5 transition">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Check inbox
        </button>
        <span class="text-slate-600">•</span>
        <span id="status" class="text-slate-500 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-slate-500"></span> Enter a name and check
        </span>
      </div>
    </section>
    <section>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-semibold text-slate-300">Inbox</h2>
        <span id="inbox-count" class="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-full">0 messages</span>
      </div>
      <div id="inbox" class="space-y-3">
        <div id="empty-state" class="text-center py-16 text-slate-500">
          <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
          <p class="text-sm">Type a name above and click "Check inbox" to view emails.</p>
        </div>
      </div>
    </section>
  </main>
  <footer class="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-slate-600">
    Powered by Cloudflare Workers · Emails are temporary and not stored permanently.
  </footer>
  <script>
    const DOMAIN = 'toolmongy.store';
    const POLL_MS = 3000;
    let currentEmail = '';
    let pollTimer = null;
    let lastSignature = '';
    let fetching = false;

    function generateRandom() {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const len = Math.floor(Math.random() * 11) + 5;
      let prefix = '';
      for (let i = 0; i < len; i++) { prefix += chars.charAt(Math.floor(Math.random() * chars.length)); }
      document.getElementById('email-prefix').value = prefix;
      checkInbox();
    }

    // Smart: the field holds only the name. The domain is appended automatically,
    // unless the user typed/pasted a full email (then we use it as-is).
    function getCurrentEmail() {
      const raw = document.getElementById('email-prefix').value.trim().toLowerCase();
      if (!raw) return null;
      const clean = function(s) { return s.replace(/[^a-z0-9._-]/g, ''); };
      if (raw.indexOf('@') !== -1) {
        const parts = raw.split('@');
        const name = clean(parts[0]);
        if (!name) return null;
        return name + '@' + DOMAIN;
      }
      const name = clean(raw);
      if (!name) return null;
      return name + '@' + DOMAIN;
    }

    function checkInbox() {
      const email = getCurrentEmail();
      if (!email) {
        document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-400"></span> Please enter a name';
        document.getElementById('email-prefix').focus();
        return;
      }
      currentEmail = email;
      lastSignature = '';
      document.getElementById('email-prefix').value = email.split('@')[0];
      document.getElementById('inbox').innerHTML = '<div class="text-center py-16 text-slate-500"><svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg><p class="text-sm">No emails yet. Your inbox is being monitored.</p></div>';
      document.getElementById('inbox-count').textContent = '0 messages';
      document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Waiting for emails…';
      startPolling();
      fetchEmails();
    }

    function startPolling() {
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = setInterval(function() { if (!document.hidden) fetchEmails(); }, POLL_MS);
    }

    // Refresh immediately when the user comes back to the tab
    document.addEventListener('visibilitychange', function() { if (!document.hidden && currentEmail) fetchEmails(); });

    async function copyEmail() {
      const email = getCurrentEmail();
      if (!email) { document.getElementById('email-prefix').focus(); return; }
      try {
        await navigator.clipboard.writeText(email);
        document.getElementById('copy-label').textContent = 'Copied!';
        setTimeout(() => { document.getElementById('copy-label').textContent = 'Copy'; }, 2000);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        document.getElementById('copy-label').textContent = 'Copied!';
        setTimeout(() => { document.getElementById('copy-label').textContent = 'Copy'; }, 2000);
      }
    }

    function escapeHtml(str) { const div = document.createElement('div'); div.textContent = str || ''; return div.innerHTML; }
    function formatTime(ts) { try { const d = new Date(typeof ts === 'number' ? ts * 1000 : ts); return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch { return ''; } }
    function sanitizeHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      div.querySelectorAll('script, style, meta, link, iframe, object, embed, form').forEach(function(el) { el.remove(); });
      div.querySelectorAll('*').forEach(function(el) {
        for (let i = el.attributes.length - 1; i >= 0; i--) {
          const attr = el.attributes[i].name;
          if (attr.startsWith('on')) el.removeAttribute(attr);
          if (attr === 'style') el.removeAttribute(attr);
        }
      });
      div.querySelectorAll('a').forEach(function(a) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer'); a.className = 'text-brand-400 underline hover:text-brand-300'; });
      return div.innerHTML;
    }

    async function fetchEmails() {
      if (!currentEmail || fetching) return;
      fetching = true;
      const requested = currentEmail;
      try {
        const res = await fetch('/get-email?to=' + encodeURIComponent(requested) + '&t=' + Date.now(), { cache: 'no-store' });
        const data = await res.json();
        if (requested !== currentEmail) return; // address changed while waiting
        const emails = Array.isArray(data) ? data : (data.emails || data.messages || []);
        const sig = emails.map(e => (e.from||'')+'|'+(e.subject||'')+'|'+(e.date||'')).join('||');
        if (sig === lastSignature) return;
        lastSignature = sig;
        if (emails.length > 0) {
          document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400"></span> ' + emails.length + ' message' + (emails.length > 1 ? 's' : '') + ' received';
          document.getElementById('inbox-count').textContent = emails.length + ' message' + (emails.length > 1 ? 's' : '');
          const inbox = document.getElementById('inbox');
          inbox.innerHTML = '';
          emails.reverse().forEach(function(email) {
            const from = email.from || email.sender || 'Unknown';
            const subject = email.subject || '(No subject)';
            const body = email.body || email.text || email.html || '';
            const date = email.date || email.timestamp || '';
            const isHtml = email.isHtml || /<[a-z][\\s\\S]*>/i.test(body);
            const card = document.createElement('div');
            card.className = 'fade-in bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition cursor-pointer';
            card.innerHTML = '<div class="flex items-start justify-between gap-3 mb-1"><div class="min-w-0"><p class="text-sm font-semibold text-slate-200 truncate">' + escapeHtml(from) + '</p><p class="text-sm text-slate-400 truncate">' + escapeHtml(subject) + '</p></div><span class="text-xs text-slate-500 shrink-0">' + escapeHtml(formatTime(date)) + '</span></div><div class="mt-2 text-sm text-slate-400 line-clamp-2">' + escapeHtml(body.replace(/<[^>]*>/g, '').substring(0, 200)) + (body.length > 200 ? '…' : '') + '</div>';
            card.onclick = function() {
              const expanded = card.querySelector('.expanded-body');
              if (expanded) { expanded.remove(); } else {
                const full = document.createElement('div');
                full.className = 'expanded-body mt-3 pt-3 border-t border-white/10 text-sm text-slate-300 break-words';
                if (isHtml) { full.innerHTML = '<div class="email-content">' + sanitizeHtml(body) + '</div>'; } else { full.innerHTML = '<div class="whitespace-pre-wrap">' + escapeHtml(body) + '</div>'; }
                card.appendChild(full);
              }
            };
            inbox.appendChild(card);
          });
        }
      } catch (err) {
        document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-400"></span> Connection error — retrying…';
      } finally {
        fetching = false;
      }
    }

    document.getElementById('email-prefix').addEventListener('keydown', function(e) { if (e.key === 'Enter') checkInbox(); });
  </script>
</body>
</html>`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, max-age=0',
  ...CORS_HEADERS,
};

// ---- D1 storage (instant consistency, unlike KV which can lag up to ~60s) ----
let tableReady = false;
async function ensureTable(env) {
  if (tableReady) return;
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS emails (id INTEGER PRIMARY KEY AUTOINCREMENT, to_addr TEXT NOT NULL, from_addr TEXT, subject TEXT, body TEXT, is_html INTEGER DEFAULT 0, date TEXT, created_at INTEGER)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_emails_to ON emails (to_addr, id)'),
  ]);
  tableReady = true;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') { return new Response(null, { status: 204, headers: CORS_HEADERS }); }
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS_HEADERS } });
    }
    if (url.pathname === '/get-email') {
      const to = url.searchParams.get('to');
      if (!to) { return new Response(JSON.stringify({ error: 'Missing "to" parameter' }), { status: 400, headers: JSON_HEADERS }); }
      try {
        await ensureTable(env);
        const { results } = await env.DB.prepare(
          'SELECT from_addr, subject, body, is_html, date FROM (SELECT id, from_addr, subject, body, is_html, date FROM emails WHERE to_addr = ? ORDER BY id DESC LIMIT 50) ORDER BY id ASC'
        ).bind(to.toLowerCase()).all();
        const emails = (results || []).map(function(r) {
          return { from: r.from_addr, subject: r.subject, body: r.body, isHtml: !!r.is_html, date: r.date };
        });
        return new Response(JSON.stringify(emails), { headers: JSON_HEADERS });
      } catch (err) {
        console.error('GET-EMAIL ERROR:', err.message);
        return new Response(JSON.stringify([]), { headers: JSON_HEADERS });
      }
    }
    return new Response('Not found', { status: 404, headers: CORS_HEADERS });
  },
  async email(message, env, ctx) {
    try {
      const to = message.to.toLowerCase();
      // Proper MIME parsing: handles base64 / quoted-printable, encoded subjects
      // (=?UTF-8?B?...?=), and any charset (UTF-8, windows-1251, koi8-r, ...)
      const rawBuf = await new Response(message.raw).arrayBuffer();
      const parsed = await new PostalMime().parse(rawBuf);
      const sender = parsed.from && (parsed.from.address || parsed.from.name);
      const from = sender ? (parsed.from.name ? parsed.from.name + ' <' + parsed.from.address + '>' : sender) : (message.from || 'Unknown');
      const subject = parsed.subject || '(No subject)';
      const isHtml = !!parsed.html;
      const body = parsed.html || parsed.text || '';
      await ensureTable(env);
      const now = Date.now();
      // Single atomic insert: no read-modify-write, so no lost emails and no delay
      await env.DB.prepare(
        'INSERT INTO emails (to_addr, from_addr, subject, body, is_html, date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(to, from, subject, body.substring(0, 50000), isHtml ? 1 : 0, new Date(now).toISOString(), now).run();
      // Cleanup of emails older than 24h, in the background (doesn't slow delivery)
      ctx.waitUntil(
        env.DB.prepare('DELETE FROM emails WHERE created_at < ?').bind(now - 86400000).run().catch(function() {})
      );
    } catch (err) {
      console.error('EMAIL HANDLER ERROR:', err.message);
    }
  },
};
