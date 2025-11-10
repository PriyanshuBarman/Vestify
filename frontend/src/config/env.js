export const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const VITE_MF_API_BASE_URL = import.meta.env.VITE_MF_API_BASE_URL;
export const VITE_MF_CHART_API_BASE_URL = import.meta.env
  .VITE_MF_CHART_API_BASE_URL;
export const VITE_STOCK_SEARCH_API_BASE_URL = import.meta.env
  .VITE_STOCK_SEARCH_API_BASE_URL;
export const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

[
  ["VITE_BACKEND_BASE_URL", VITE_BACKEND_BASE_URL],
  ["VITE_MF_API_BASE_URL", VITE_MF_API_BASE_URL],
  ["VITE_MF_CHART_API_BASE_URL", VITE_MF_CHART_API_BASE_URL],
  ["VITE_STOCK_SEARCH_API_BASE_URL", VITE_STOCK_SEARCH_API_BASE_URL],
  ["VITE_GOOGLE_CLIENT_ID", VITE_GOOGLE_CLIENT_ID],
].forEach(([key, value]) => {
  if (!value)
    throw new Error(`${key} is not defined in environment variables!`);
});
