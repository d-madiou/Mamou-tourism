const rawBaseUrl =
  import.meta.env.VITE_STRAPI_URL || "https://api.villedemamou.org";

export const STRAPI_BASE_URL = rawBaseUrl.replace(/\/+$/, "");
export const STRAPI_API_URL = `${STRAPI_BASE_URL}/api`;

export const toMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
};
