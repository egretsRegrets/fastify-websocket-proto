import Fastify from "fastify";
import FastifyWebsocket from "@fastify/websocket";

const server = Fastify({
  logger: true,
});

await server.register(FastifyWebsocket);

server.get("/", function handleRoot(request, reply) {
  reply.send({ hello: "world" });
});

server.get("/ws", { websocket: true }, function handleWS(socket, req) {
  socket.on("message", function (message) {
    socket.send(
      `Hello from fastify web socket, your message was: "${message}"`
    );
  });
});

await server.listen({ port: 3000 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
