import {User} from "../entities/User";  

export interface UsersRepository {
    findByEmail(email: string): Promise<User>;
    create(user: User): Promise<void>;
}
