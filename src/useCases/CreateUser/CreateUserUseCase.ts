import { User } from "../../entities/User";
import { MailProvider } from "../../providers/MailProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailProvider: MailProvider,
  ) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    this.usersRepository.create(user);
    this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      from: {
        email: "exemplo@exemplo.com",
        name: "Exemplo",
      },
      subject: "Bem-vindo ao nosso sistema!",
      body: `Olá ${user.name}, obrigado por se cadastrar!`,
    });
  }
}
