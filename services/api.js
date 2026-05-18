const DEFAULT_BASE_URL = 'https://api.runteam.example';

function buildUrl(path) {
  return `${DEFAULT_BASE_URL}${path}`;
}

// Import the store but DON'T use hooks here. We read from getState().
import { useAppStore } from '../store/appStore.js';

async function request(path, options = {}) {
  const { token } = useAppStore.getState();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // NOTE: in this demo there is no real backend; this fetcher is prepared
  // to include Authorization when a token exists. Network calls may fail
  // if the DEFAULT_BASE_URL is not reachable.
  const response = await fetch(buildUrl(path), {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const apiClient = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};