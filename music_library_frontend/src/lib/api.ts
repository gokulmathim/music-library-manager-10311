const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';

/**
 * Wrap fetch to always use backend API and handle JSON, errors, and credentials.
 * @param path Backend path (e.g., '/tracks')
 * @param options fetch options (method, headers, body, etc.)
 * @returns Parsed response (json) or throws error
 */
// PUBLIC_INTERFACE
export async function apiFetch(path: string, options: RequestInit = {}) {
  // Always include cookie credentials
  // Build headers dynamically to avoid TS error with undefined 'Content-Type'
  // (Type 'string | undefined' is not assignable to type 'string')
  const baseHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };
  if (!(options.body instanceof FormData)) {
    baseHeaders['Content-Type'] = 'application/json';
  }
  const opts: RequestInit = {
    credentials: 'include',
    ...options,
    headers: baseHeaders,
  };
  const res = await fetch(`${BACKEND_API_URL}${path}`, opts);
  if (!res.ok) {
    let errMsg;
    try {
      errMsg = (await res.json()).message || res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg || 'API error');
  }
  if (res.status === 204) return null;
  if (res.headers.get('content-type')?.includes('application/json')) {
    return res.json();
  }
  return res;
}
