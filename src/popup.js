// popup.js – Logic for the DEVECO UTM Link Copier popup

const UTM_PARAMS = 'utm_campaign=DEVECO_GDEMembers&utm_source=deveco';

/**
 * Append UTM parameters to a URL string.
 * @param {string} rawUrl
 * @returns {string}
 */
function buildUtmUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const params = new URLSearchParams(UTM_PARAMS);
    params.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}${UTM_PARAMS}`;
  }
}

/**
 * Render the URL preview, highlighting the UTM portion.
 */
function renderPreview(utmUrl) {
  const el = document.getElementById('urlPreview');
  const utmIndex = utmUrl.indexOf('utm_campaign');
  if (utmIndex === -1) {
    el.textContent = utmUrl;
    return;
  }
  const base = utmUrl.slice(0, utmIndex);
  const utm = utmUrl.slice(utmIndex);
  el.innerHTML = `${escapeHtml(base)}<span class="utm-part">${escapeHtml(utm)}</span>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setStatus(msg, type = '') {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = type;
}

function setButtonState(state) {
  const btn = document.getElementById('copyBtn');
  const icon = document.getElementById('btnIcon');
  const label = document.getElementById('btnLabel');
  if (state === 'success') {
    btn.classList.add('success');
    icon.textContent = '✅';
    label.textContent = 'Copied!';
  } else if (state === 'idle') {
    btn.classList.remove('success');
    icon.textContent = '📋';
    label.textContent = 'Copy UTM Link';
  }
}

// Main: query the active tab and wire up the button.
(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.url) {
    document.getElementById('urlPreview').textContent = 'No URL available.';
    setStatus("Cannot access this tab's URL.", 'error');
    return;
  }

  const utmUrl = buildUtmUrl(tab.url);
  renderPreview(utmUrl);

  document.getElementById('copyBtn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(utmUrl);
      setButtonState('success');
      setStatus('Link copied to clipboard!', 'success');
      setTimeout(() => {
        setButtonState('idle');
        setStatus('');
      }, 2500);
    } catch (err) {
      setStatus(`Copy failed: ${err.message}`, 'error');
    }
  });
})();
