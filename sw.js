// =====================================================================
// UniVault — Service worker (§20)
// Handles push notifications and notification clicks.
// =====================================================================

const SW_BASE = self.registration ? self.registration.scope : '/';

function absUrl(path) {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\//, '');
  return SW_BASE + clean;
}

self.addEventListener('push', function (event) {
  let data;
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: 'UniVault', body: event.data.text(), url: SW_BASE };
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: absUrl('/icons/icon-192.png'),
      badge: absUrl('/icons/icon-192.png'),
      data: { url: data.url }
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? absUrl(event.notification.data.url) : SW_BASE;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
      for (const client of windowClients) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
