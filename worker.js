const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    .email-frame { width:100%; min-height:200px; border:0; display:block; }
    .email-viewer a { color:#4f46e5; text-decoration:underline; }
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
        <input
          id="email-prefix"
          type="text"
          placeholder="type a prefix or full email"
          autocomplete="off"
          spellcheck="false"
          class="flex-1 bg-slate-900/60 rounded-xl px-4 py-3 text-lg font-mono text-brand-300 outline-none placeholder-slate-600 min-w-0"
        />
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
    const DOMAIN = 'toolmongy.store';
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
      let val = document.getElementById('email-prefix').value.trim().toLowerCase();
      if (!val) return null;
      if (val.indexOf('@') !== -1) {
        val = val.split('@')[0];
      }
      val = val.replace(/[^a-z0-9._-]/g, '');
      if (!val) return null;
      return val + '@' + DOMAIN;
    }

    function checkInbox() {
      const email = getCurrentEmail();
      if (!email) {
        document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-400"></span> Please enter a prefix';
        document.getElementById('email-prefix').focus();
        return;
      }
      currentEmail = email;
      lastSignature = '';
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

    function computeSignature(emails) {
      return emails.map(function(e) {
        return (e.from||'') + '|' + (e.subject||'') + '|' + (e.date||'') + '|' + (e.body||'').substring(0,100);
      }).join('~~');
    }

    function linkifyText(text) {
      var escaped = escapeHtml(text);
      var urlRegex = /(https?:\/\/[^\s<]+)/gi;
      return escaped.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" style="color:#818cf8;text-decoration:underline;">' + url + '</a>';
      });
    }

    function buildEmailViewer(email) {
      const htmlContent = email.html || '';
      const textContent = email.text || email.body || '';
      const hasHtml = htmlContent && htmlContent.length > 0;

      var wrapper = document.createElement('div');
      wrapper.className = 'email-viewer mt-3 pt-3 border-t border-white/10';

      if (hasHtml) {
        var iframe = document.createElement('iframe');
        iframe.className = 'email-frame';
        iframe.setAttribute('sandbox', 'allow-same-origin allow-popups allow-top-navigation');
        iframe.setAttribute('scrolling', 'auto');
        wrapper.appendChild(iframe);

        var docContent = '<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"><style>' +
          'body{font-family:Inter,system-ui,sans-serif;font-size:14px;color:#1e293b;padding:12px;margin:0;line-height:1.6;}' +
          'img{max-width:100%;height:auto;}' +
          'a{color:#4f46e5;text-decoration:underline;}' +
          'a:hover{color:#4338ca;}' +
          'button, .button, [role=button]{cursor:pointer;}' +
          '</style></head><body>' + htmlContent + '</body></html>';

        iframe.srcdoc = docContent;

        iframe.onload = function() {
          try {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            var h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, 200);
            iframe.style.height = h + 'px';
          } catch(e) {
            iframe.style.height = '400px';
          }
        };

        setTimeout(function() {
          try {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            if (doc && doc.body) {
              var h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, 200);
              iframe.style.height = h + 'px';
            }
          } catch(e) {}
        }, 200);

      } else {
        var div = document.createElement('div');
        div.className = 'text-sm text-slate-300 whitespace-pre-wrap break-words';
        div.innerHTML = linkifyText(textContent);
        wrapper.appendChild(div);
      }

      return wrapper;
    }

    async function fetchEmails() {
      if (!currentEmail) return;
      try {
        const res = await fetch('/get-email?to=' + encodeURIComponent(currentEmail));
        const data = await res.json();
        const emails = Array.isArray(data) ? data : (data.emails || data.messages || []);
        if (emails.length > 0) {
          var sig = computeSignature(emails);
          if (sig === lastSignature) return;
          lastSignature = sig;
          document.getElementById('status').innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400"></span> ' + emails.length + ' message' + (emails.length > 1 ? 's' : '') + ' received';
          document.getElementById('inbox-count').textContent = emails.length + ' message' + (emails.length > 1 ? 's' : '');
          const inbox = document.getElementById('inbox');
          inbox.innerHTML = '';
          emails.reverse().forEach(function(email) {
            const from = email.from || email.sender || 'Unknown';
            const subject = email.subject || '(No subject)';
            const text = email.text || email.body || '';
            const date = email.date || email.timestamp || '';
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
              '<div class="mt-2 text-sm text-slate-400 line-clamp-2">' + escapeHtml(text.substring(0, 200)) + (text.length > 200 ? '…' : '') + '</div>';
            card.onclick = function() {
              const expanded = card.querySelector('.email-viewer');
              if (expanded) {
                expanded.remove();
              } else {
                const viewer = buildEmailViewer(email);
                card.appendChild(viewer);
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

function decodeQuotedPrintable(str) {
  if (!str) return '';
  return str
    .replace(/=\r\n/g, '')
    .replace(/=\n/g, '')
    .replace(/=([0-9A-Fa-f]{2})/g, function(_, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    })
    .replace(/=3D/g, '=');
}

function decodeBase64(str) {
  try {
    const cleaned = str.replace(/\s/g, '');
    const bytes = Uint8Array.from(atob(cleaned), function(c) { return c.charCodeAt(0); });
    return new TextDecoder('utf-8').decode(bytes);
  } catch(e) {
    return str;
  }
}

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
        return new Response(JSON.stringify({ error: 'Missing to parameter' }), {
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
    const to = message.to.toLowerCase();
    const from = message.from || 'Unknown';
    const subject = message.headers.get('subject') || '(No subject)';

    const raw = await new Response(message.raw).text();

    let headersSection = raw;
    let bodySection = raw;
    const sepIdx = raw.indexOf('\r\n\r\n');
    if (sepIdx >= 0) {
      headersSection = raw.substring(0, sepIdx);
      bodySection = raw.substring(sepIdx + 4);
    } else {
      const sep2 = raw.indexOf('\n\n');
      if (sep2 >= 0) {
        headersSection = raw.substring(0, sep2);
        bodySection = raw.substring(sep2 + 2);
      }
    }

    let htmlContent = '';
    let textContent = '';

    const ctMatch = headersSection.match(/Content-Type:\s*multipart\/[\w.+-]+\s*;\s*boundary\s*=\s*"?([^"\r\n;]+)"?/i);

    if (ctMatch) {
      const boundary = ctMatch[1].trim();
      const parts = bodySection.split('--' + boundary);

      for (const part of parts) {
        const trimmed = part.replace(/^[\r\n]+/, '');
        if (trimmed === '' || trimmed === '--' || trimmed.startsWith('--')) continue;

        const partSep = trimmed.indexOf('\r\n\r\n');
        const partSep2 = trimmed.indexOf('\n\n');
        let partHeaders = '';
        let partBody = '';
        if (partSep >= 0) {
          partHeaders = trimmed.substring(0, partSep);
          partBody = trimmed.substring(partSep + 4);
        } else if (partSep2 >= 0) {
          partHeaders = trimmed.substring(0, partSep2);
          partBody = trimmed.substring(partSep2 + 2);
        } else {
          partBody = trimmed;
        }

        const encMatch = partHeaders.match(/Content-Transfer-Encoding:\s*(\S+)/i);
        const encoding = encMatch ? encMatch[1].toLowerCase().trim() : '';
        if (encoding === 'quoted-printable') {
          partBody = decodeQuotedPrintable(partBody);
        } else if (encoding === 'base64') {
          partBody = decodeBase64(partBody);
        }

        if (partHeaders.match(/Content-Type:\s*text\/html/i)) {
          if (!htmlContent) htmlContent = partBody.trim();
        } else if (partHeaders.match(/Content-Type:\s*text\/plain/i)) {
          if (!textContent) textContent = partBody.trim();
        }
      }
    } else {
      let singleBody = bodySection;
      const encMatch = headersSection.match(/Content-Transfer-Encoding:\s*(\S+)/i);
      const encoding = encMatch ? encMatch[1].toLowerCase().trim() : '';
      if (encoding === 'quoted-printable') {
        singleBody = decodeQuotedPrintable(singleBody);
      } else if (encoding === 'base64') {
        singleBody = decodeBase64(singleBody);
      }

      if (headersSection.match(/Content-Type:\s*text\/html/i) || /<html|<body|<table|<div\s/i.test(singleBody)) {
        htmlContent = singleBody.trim();
      } else {
        textContent = singleBody.trim();
      }
    }

    if (!htmlContent && !textContent) {
      textContent = bodySection.trim();
    }

    const emailEntry = {
      from: from,
      subject: subject,
      html: htmlContent.substring(0, 50000),
      text: textContent.substring(0, 50000),
      body: (htmlContent || textContent).substring(0, 50000),
      date: new Date().toISOString(),
    };

    const key = 'inbox:' + to;
    const existing = await env.MAIL_KV.get(key, 'json');
    const emails = Array.isArray(existing) ? existing : [];
    emails.push(emailEntry);

    const trimmed = emails.slice(-50);
    await env.MAIL_KV.put(key, JSON.stringify(trimmed), { expirationTtl: 86400 });
  },
};
