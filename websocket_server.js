const WebSocket = require("ws");
const fs = require("fs");

const server = new WebSocket.Server({ port: 8080 }); // Use any available port

server.on("connection", (socket) => {
  console.log("Client connected.");

  // Send the EDIFACT file to the client
  const edifactContent = fs.readFileSync("edifact_output.edi", "utf8");
  socket.send(edifactContent);

  socket.on("message", (message) => {
    console.log(`Received message from client: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected.");
  });
});
