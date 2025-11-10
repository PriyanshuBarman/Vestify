export const getMainDomain = (urlString) => {
  if (!urlString) return;

  const hostname = new URL(urlString).hostname.replace("www.", "");
  const parts = hostname.split(".");

  const lastTwoParts = parts.slice(-2).join(".");

  if (lastTwoParts === "co.in") {
    // For .co.in domains, take the last 3 parts
    return parts.length > 2 ? parts.slice(-3).join(".") : hostname;
  }

  // For regular .com, .in, .org domains, take the last 2 parts
  return parts.length > 1 ? parts.slice(-2).join(".") : hostname;
};
