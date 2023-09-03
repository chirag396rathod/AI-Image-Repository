let users = [];

export const ConnectSocketIO = (io) => {
  io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);
    socket.on("addUser", (userId) => {
      const isUserExist = users.find((user) => user.userId === userId);
      if (!isUserExist) {
        const user = { userId, socketId: socket?.id };
        users.push(user);
        console.log(users);
        io.emit("getUser", users);
      }
    });
    socket.on("disconnect", () => {
      const existUsers = users.filter((user) => user?.socketId !== socket?.id);
      io.emit("getUser", existUsers);
      console.log("A user disconnected");
    });
  });
};
