import { Server } from "socket.io";

let onlineUsers = 0;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Iniciando servidor Socket.IO...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      onlineUsers++;
      io.emit("online-users", onlineUsers); // Envia o total para todos os clientes

      console.log(`Usuário conectado. Total: ${onlineUsers}`);

      socket.on("disconnect", () => {
        onlineUsers--;
        io.emit("online-users", onlineUsers); // Atualiza total após desconexão
        console.log(`Usuário desconectado. Total: ${onlineUsers}`);
      });
    });
  }

  res.end();
}
