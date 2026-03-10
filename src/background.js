// background.js – Service Worker for DEVECO UTM Link Copier

const UTM_PARAMS = 'utm_campaign=DEVECO_GDEMembers&utm_source=deveco';

/**
 * Append UTM parameters to a URL string.
 * Handles existing query strings and hash fragments correctly.
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

// Create the context menu item once the service worker installs.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy-utm-url',
    title: 'Copy UTM Link (DEVECO)',
    contexts: ['page'],
  });
});

// Handle context menu click.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'copy-utm-url') return;

  // Use scripting API to write to clipboard inside the active tab.
  // activeTab permission grants temporary access to the tab's origin.
  const utmUrl = buildUtmUrl(tab.url);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (urlToCopy) => {
      return navigator.clipboard.writeText(urlToCopy)
        .then(() => ({ success: true }))
        .catch((err) => ({ success: false, error: err.message }));
    },
    args: [utmUrl],
  }).then((results) => {
    const result = results?.[0]?.result;
    if (result?.success) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'DEVECO UTM Link Copied!',
        message: utmUrl,
      });
    } else {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Copy Failed',
        message: result?.error || 'Unable to write to clipboard.',
      });
    }
  }).catch((err) => {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Copy Failed',
      message: err.message || 'An unexpected error occurred.',
    });
  });
});
