import { api } from "@/lib/axios";

// ================ QUERIES ================

export const fetchAnnouncements = async () => {
  const { data } = await api.get(`/announcements`);
  return data.announcements;
};

// ================ MUTATIONS ================

export const dismissAnnouncement = async ({ id }) => {
  const { data } = await api.post(`/announcements/${id}/dismiss`);
  return data;
};
