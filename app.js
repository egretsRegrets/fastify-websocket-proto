import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/", function rootHandler(request, reply) {
  reply.send({ hello: "world" });
});

server.listen({ port: 3000 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
