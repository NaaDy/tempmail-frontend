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
          <input
            id="email-prefix"
            type="text"
            placeholder="type-a-prefix"
            autocomplete="off"
            spellcheck="false"
            class="flex-1 bg-transparent px-4 py-3 text-lg font-mono text-brand-300 outline-none placeholder-slate-600 min-w-0"
          />
          <span id="email-suffix" class="px-3 py-3 text-lg font-mono text-slate-500 shrink-0 select-none">@toolmongy.store</span>
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
          <span class="w-2 h-2 rounded-full bg-slate-500"></span> Enter a prefix and check
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
          <p class="text-sm">Type a prefix above and click "Check inbox" to view emails.</p>
        </div>
      </div>
    </section>

  </main>

  <footer class="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-slate-600">
    Powered by Cloudflare Workers · Emails are temporary and not stored permanently.
  </footer>

  <script>
    let currentEmail = '';
    let pollTimer = null;
    let lastSignature = '';

    function generateRandom() {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const len = Math.floor(Math.random() * 11) + 5;
      let prefix = '';
      for (let i = 0; i < len; i++) {
        prefix += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      document.getElementById('email-prefix').value = prefix;
      checkInbox();
    }

    function getCurrentEmail() {
      const prefix = document.getElementById('email-prefix').value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
      if (!prefix) return null;
      const suffixEl = document.getElementById('email-suffix');
      const domain = suffixEl ? suffixEl.textContent.replace('@', '').trim() : 'toolmongy.store';
      return prefix + '@' + domain;
    }

    function checkInbox() {
      const email = getCurrentEmail();
      if (!email) {
        document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-400"></span> Please enter a prefix';
        document.getElementById('email-prefix').focus();
        return;
      }
      currentEmail = email;
      document.getElementById('email-prefix').value = email.split('@')[0];
      document.getElementById('inbox').innerHTML =
        '<div class="text-center py-16 text-slate-500"><svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg><p class="text-sm">No emails yet. Your inbox is being monitored.</p></div>';
      document.getElementById('inbox-count').textContent = '0 messages';
      document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Waiting for emails…';
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = setInterval(fetchEmails, 5000);
      fetchEmails();
    }

    async function copyEmail() {
      const email = getCurrentEmail();
      if (!email) {
        document.getElementById('email-prefix').focus();
        return;
      }
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

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str || '';
      return div.innerHTML;
    }

    function formatTime(ts) {
      try {
        const d = new Date(typeof ts === 'number' ? ts * 1000 : ts);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch { return ''; }
    }

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
      div.querySelectorAll('a').forEach(function(a) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        a.className = 'text-brand-400 underline hover:text-brand-300';
      });
      return div.innerHTML;
    }

    async function fetchEmails() {
      if (!currentEmail) return;
      try {
        const res = await fetch('/get-email?to=' + encodeURIComponent(currentEmail));
        const data = await res.json();
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
            const isHtml = email.isHtml || /<[a-z][\s\S]*>/i.test(body);
            const card = document.createElement('div');
            card.className = 'fade-in bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition cursor-pointer';
            card.innerHTML =
              '<div class="flex items-start justify-between gap-3 mb-1">' +
                '<div class="min-w-0">' +
                  '<p class="text-sm font-semibold text-slate-200 truncate">' + escapeHtml(from) + '</p>' +
                  '<p class="text-sm text-slate-400 truncate">' + escapeHtml(subject) + '</p>' +
                '</div>' +
                '<span class="text-xs text-slate-500 shrink-0">' + escapeHtml(formatTime(date)) + '</span>' +
              '</div>' +
              '<div class="mt-2 text-sm text-slate-400 line-clamp-2">' + escapeHtml(body.replace(/<[^>]*>/g, '').substring(0, 200)) + (body.length > 200 ? '…' : '') + '</div>';
            card.onclick = function() {
              const expanded = card.querySelector('.expanded-body');
              if (expanded) {
                expanded.remove();
              } else {
                const full = document.createElement('div');
                full.className = 'expanded-body mt-3 pt-3 border-t border-white/10 text-sm text-slate-300 break-words';
                if (isHtml) {
                  full.innerHTML = '<div class="email-content">' + sanitizeHtml(body) + '</div>';
                } else {
                  full.innerHTML = '<div class="whitespace-pre-wrap">' + escapeHtml(body) + '</div>';
                }
                card.appendChild(full);
              }
            };
            inbox.appendChild(card);
          });
        }
      } catch (err) {
        document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-400"></span> Connection error — retrying…';
      }
    }

    document.getElementById('email-prefix').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') checkInbox();
    });
  </script>
</body>
</html>`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS_HEADERS },
      });
    }

    if (url.pathname === '/get-email') {
      const to = url.searchParams.get('to');
      if (!to) {
        return new Response(JSON.stringify({ error: 'Missing "to" parameter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      }

      const key = 'inbox:' + to.toLowerCase();
      const data = await env.MAIL_KV.get(key, 'json');

      if (!data || !Array.isArray(data) || data.length === 0) {
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      }

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    return new Response('Not found', { status: 404, headers: CORS_HEADERS });
  },

  async email(message, env, ctx) {
    try {
      const to = message.to.toLowerCase();
      const from = message.from || 'Unknown';
      const subject = message.headers.get('subject') || '(No subject)';

      const rawBody = await new Response(message.raw).text();

      let body = '';
      let isHtml = false;

      const htmlMatch = rawBody.match(/Content-Type:\s*text\/html[\s\S]*?\r?\n\r?\n([\s\S]*?)(?:\r?\n--)/i);
      if (htmlMatch) {
        body = htmlMatch[1].trim();
        body = body.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/g, function(m, p1) {
          return String.fromCharCode(parseInt(p1, 16));
        });
        isHtml = true;
      } else {
        const textMatch = rawBody.match(/Content-Type:\s*text\/plain[\s\S]*?\r?\n\r?\n([\s\S]*?)(?:\r?\n--)/i);
        if (textMatch) {
          body = textMatch[1].trim();
          body = body.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/g, function(m, p1) {
            return String.fromCharCode(parseInt(p1, 16));
          });
        } else {
          const headerEnd = rawBody.indexOf('\r\n\r\n');
          body = headerEnd >= 0 ? rawBody.substring(headerEnd + 4) : rawBody;
          isHtml = /<[a-z][\s\S]*>/i.test(body);
        }
      }

      const emailEntry = {
        from: from,
        subject: subject,
        body: body.substring(0, 50000),
        isHtml: isHtml,
        date: new Date().toISOString(),
      };

      const key = 'inbox:' + to;
      const existing = await env.MAIL_KV.get(key, 'json');
      const emails = Array.isArray(existing) ? existing : [];
      emails.push(emailEntry);

      const trimmed = emails.slice(-50);
      await env.MAIL_KV.put(key, JSON.stringify(trimmed), { expirationTtl: 86400 });
    } catch (err) {
      console.error('EMAIL HANDLER ERROR:', err.message);
    }
  },
};