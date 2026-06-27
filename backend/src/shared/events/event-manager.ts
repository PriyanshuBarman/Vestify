import type { Response } from "express";

const clients = new Map();

export function addClient(userId: string, res: Response) {
  if (!clients.has(userId)) {
    clients.set(userId, new Set());
  }
  clients.get(userId).add(res);

  res.on("close", () => {
    clients.get(userId)?.delete(res);
    if (clients.get(userId).size === 0) {
      clients.delete(userId);
    }
  });
}

export function sendUserEvent(userId: string, payload: unknown) {
  if (clients.has(userId)) {
    clients.get(userId).forEach((res: Response) => {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    });
  }
}
