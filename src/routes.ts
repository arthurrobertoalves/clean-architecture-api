import { FastifyInstance } from "fastify";

export function setupRoutes(router: FastifyInstance) {
  router.post("/", async (req, res) => {
    return res.status(201).send();
  });
}