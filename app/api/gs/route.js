import { NextResponse } from 'next/server';

// Proxy POST requests to Google Apps Script to avoid browser CORS
export async function POST(request) {
  try {
    const payload = await request.json(); // Expecting { type, payload }

    // Prefer env var; fallback to utils file so it works locally without extra setup
    const envUrl = process.env.GAS_WEBAPP_URL;
    let SCRIPT_URL = envUrl;
    if (!SCRIPT_URL) {
      try {
        const mod = await import('../../../utils/google-script.js');
        SCRIPT_URL = mod.default;
      } catch (e) {
        // ignore, handled below
      }
    }

    if (!SCRIPT_URL) {
      return NextResponse.json(
        { ok: false, error: 'Google Apps Script URL is not configured' },
        { status: 500 }
      );
    }

    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Server-to-server; no CORS needed here
    });

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      // Not JSON from Apps Script (likely HTML auth page or error) => treat as failure
      json = { ok: false, status: res.status, body: text };
    }

    // If upstream status not ok or payload indicates failure, return failure with details
    if (!res.ok || !json?.ok) {
      // Best-effort log on server for debugging in dev
      console.error('GAS proxy error', {
        status: res.status,
        statusText: res.statusText,
        bodySample: (text || '').slice(0, 300),
      });
      return NextResponse.json(
        { ok: false, status: res.status, error: json?.error || 'Upstream error', body: json?.body || text },
        { status: 502 }
      );
    }

    return NextResponse.json(json, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
