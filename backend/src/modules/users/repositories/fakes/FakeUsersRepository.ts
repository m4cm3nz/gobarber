import IFindAllProviders from '@modules/appointments/dtos/IFindAllProviders';
import ICreateUser from '@modules/users/dtos/ICreateUser';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { v4 as uuid } from 'uuid';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create({ name, email, password }: ICreateUser): Promise<User> {
        const user = { ...new User(), id: uuid(), name, email, password };

        this.users.push(user);
        return user;
    }

    public async findAllProviders({
        except_user_id,
    }: IFindAllProviders): Promise<User[]> {
        const { users } = this;

        if (except_user_id)
            return users.filter(user => user.id !== except_user_id);

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );
        this.users[findIndex] = user;
        return user;
    }
}

export default FakeUsersRepository;
