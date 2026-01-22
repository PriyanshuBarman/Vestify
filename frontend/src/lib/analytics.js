import ReactGA from "react-ga4";
import { VITE_GA_MEASUREMENT_ID } from "@/config/env";

const GA_MEASUREMENT_ID = VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  } else {
    console.warn("GA4 Measurement ID not found. Analytics disabled.");
  }
};

/**
 * Track a page view
 * @param {string} path - The path of the page
 * @param {string} title - The title of the page
 */
export const trackPageView = (path, title) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: "pageview", page: path, title: title });
  }
};

/**
 * Track a custom event
 * @param {string} category - Event category (e.g., 'PWA')
 * @param {string} action - Event action (e.g., 'Install Accepted')
 * @param {Object} [params] - Optional parameters
 */
export const trackEvent = (category, action, params = {}) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      ...params,
    });
  }
};
