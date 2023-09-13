import { io } from "../../index.js";
let users = [];

export const ConnectSocketIO = () => {
  io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);
    socket.on("addUser", (userId) => {
      const isUserExist = users.find((user) => user.userId === userId);

      if (!isUserExist) {
        const user = { userId, socketId: socket?.id };
        users.push(user);
      }

      io.emit("getUser", users);
    });
    socket.on("sendMassage", ({ conversationId, sender, text, reciver }) => {
      const reciverUser = users.find((user) => user.userId === reciver);
      const senderUser = users.find((user) => user.userId === sender);
      const newMassage = {
        updatedAt: new Date(),
        text,
        sender,
        conversationId,
      };
      console.log(users);
      console.log(senderUser);
      if (reciverUser?.socketId) {
        io.to(reciverUser?.socketId).emit("getMassage", newMassage);
      }
      if (senderUser?.socketId) {
        io.to(senderUser?.socketId).emit("getMassage", newMassage);
      }
    });
    socket.on("disconnect", () => {
      const existUsers = users.filter((user) => user?.socketId !== socket?.id);
      io.emit("getUser", existUsers);
    });
  });
};
