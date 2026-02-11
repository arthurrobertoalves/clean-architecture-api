import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    this.usersRepository.create(user);
  }
}
