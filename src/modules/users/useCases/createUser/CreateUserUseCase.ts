import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Já existe um usuário cadastrado com esse e-mail!");
    }

    const newUser = this.usersRepository.create({ email, name });
    return newUser;
  }
}

export { CreateUserUseCase };
