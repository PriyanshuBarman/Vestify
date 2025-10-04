const clients = new Map();

export const addClient = (userId, res) => {
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
};

export const sendUserEvent = (userId, payload) => {
  if (clients.has(userId)) {
    clients.get(userId).forEach((res) => {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    });
  }
};
