// Client-side helper that always posts via our server proxy to avoid CORS
export async function postToAppsScript(type, payload) {
  const res = await fetch('/api/gs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, payload }),
  });
  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error('Failed to parse response from proxy: ' + e.message);
  }
  if (!res.ok || (json && json.ok === false)) {
    throw new Error(json?.error || `Proxy failed with status ${res.status}`);
  }
  return json;
}
