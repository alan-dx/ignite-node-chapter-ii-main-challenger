import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) throw new Error("O usuário não existe!");

    const isUserAdmin = user.admin;

    if (!isUserAdmin) throw new Error("Você não tem a permissão necessária!");

    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
