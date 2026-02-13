import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "./CreateUserUseCase";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(
    request: FastifyRequest<{ Body: CreateUserRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { name, email, password } = request.body;

    try {
      await this.createUserUseCase.execute({ name, email, password });

      return reply.status(201).send();
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
