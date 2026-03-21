import { api } from "@/lib/axios";

export const fetchSessions = async () => {
  const { data } = await api.get(`/auth/sessions`);
  return data.activeSessions;
};

export const deleteSession = async ({ sessionId }) => {
  const { data } = await api.delete(`/auth/sessions/${sessionId}`);
  return data;
};

export const deleteAllSessions = async () => {
  const { data } = await api.delete(`/auth/sessions`);
  return data;
};
