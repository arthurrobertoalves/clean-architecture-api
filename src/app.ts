import fastify from "fastify";
import { setupRoutes } from "./routes";

const app = fastify();

app.register(setupRoutes);

export { app };
