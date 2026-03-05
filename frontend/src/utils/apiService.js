import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
const DEFAULT_TIMEOUT = 10_000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1_000; // 1 second

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true, // send cookies on cross-origin requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Cancellation 
// Keep a map of pending requests so duplicate in-flight requests can be cancelled.
const pendingRequests = new Map();

function getRequestKey(config) {
  return [config.method, config.url, JSON.stringify(config.params)].join("|");
}

apiService.interceptors.request.use((config) => {
  const key = getRequestKey(config);

  // Cancel any existing in-flight request with the same key
  if (pendingRequests.has(key)) {
    pendingRequests.get(key).abort();
  }

  // Attach a fresh AbortController so the caller can cancel manually too
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(key, controller);

  return config;
});

//  Response Interceptor — cleanup + retry on network errors 
apiService.interceptors.response.use(
  (response) => {
    // Remove the resolved request from the pending map
    const key = getRequestKey(response.config);
    pendingRequests.delete(key);
    return response;
  },
  async (error) => {
    const config = error.config;

    // Remove from pending map regardless of outcome
    if (config) {
      const key = getRequestKey(config);
      pendingRequests.delete(key);
    }

    // Don't retry cancelled requests or if no config available
    if (!config || axios.isCancel(error)) {
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount ?? 0;

    const isNetworkOrTimeout = !error.response || error.code === "ECONNABORTED";

    if (!isNetworkOrTimeout || config.__retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    config.__retryCount += 1;

    // Exponential back-off: 1s, 2s, 4s …
    const delay = RETRY_DELAY_MS * 2 ** (config.__retryCount - 1);
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Re-attach a fresh AbortController for the retry
    const controller = new AbortController();
    config.signal = controller.signal;
    const key = getRequestKey(config);
    pendingRequests.set(key, controller);

    return apiService(config);
  },
);

/**
 * Cancel all pending requests — useful on route change / component unmount.
 */
export function cancelAllRequests() {
  pendingRequests.forEach((controller) => controller.abort());
  pendingRequests.clear();
}

export default apiService;
