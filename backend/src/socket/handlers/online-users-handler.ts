import type { Server, Socket } from "socket.io";

const onlineUsers = new Set<string>();

export const registerOnlineUsersHandler = (io: Server, socket: Socket) => {
  const userId = socket.data.userId;
  if (!userId) return;

  onlineUsers.add(userId);
  io.emit("user:online", Array.from(onlineUsers));

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("user:online", Array.from(onlineUsers));
  });
};
