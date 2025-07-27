const Message = require("../models/messageModel.js");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("sendMessage", async (messageText) => {
      const newMessage = await Message.create({ text: messageText });

      io.emit("recieveMessage", {
        test: newMessage,
        createdAt: newMessage.createdAt,
      });
    });

    io.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};
