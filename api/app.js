import Fastify, { fastify } from "fastify";
import FastifyWebsocket from "@fastify/websocket";
// import FastifyStatic from "@fastify/static";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = Fastify({
  logger: true,
});

function broadcast(message) {
  server.websocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}

await server.register(FastifyWebsocket);
// await server.register(FastifyStatic, {
//   root: path.join(__dirname, "public"),
//   prefix: "/",
// });

server.addHook("preValidation", async function (req, reply) {
  if (req.routeOptions.url === "/chat" && !req.query.username) {
    reply.code(403).send("Connection rejected");
  }
});

server.get("/chat", { websocket: true }, function handleChatWs(socket, req) {
  broadcast({
    sender: "__server",
    message: `${req.query.username} joined`,
  });

  socket.on("message", function handleChatMsg(message) {
    message = JSON.parse(message.toString());
    broadcast({
      sender: req.query.username,
      ...message,
    });
  });

  socket.on("close", function handleChatExit() {
    broadcast({
      sender: "__server",
      message: `${req.query.username} has exited.`,
    });
  });
});

// server.get("/", function handleRoot(request, reply) {
//   reply.send({ hello: "world" });
// });

// server.get("/ws", { websocket: true }, function handleWS(socket, req) {
//   console.log("Client connected.");
//   socket.send(`Hello ${req.query["username"]}!`);

//   socket.on("message", function (message) {
//     console.log(`Client message: ${message}`);
//     socket.send(
//       `Hello from fastify web socket, your message was: "${message}"`
//     );
//   });

//   socket.on("close", function (code) {
//     console.log(`Client disconnected, with code ${code}`);
//   });
// });

// server.route({
//   method: "GET",
//   url: "/hello",
//   handler: function handleHelloHttp(req, reply) {
//     reply.send({ message: "Hello world" });
//   },
//   wsHandler: function handleHelloWs(socket, req) {
//     socket.send("Hello from Fastify Websocket");
//   },
// });

await server.listen({ port: PORT }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
