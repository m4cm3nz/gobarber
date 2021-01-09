import IFindAllProviders from '@modules/appointments/dtos/IFindAllProviders';
import ICreateUser from '@modules/users/dtos/ICreateUser';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Not, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public create({ name, email, password }: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });

        return this.ormRepository.save(user);
    }

    public async findAllProviders({
        except_user_id,
    }: IFindAllProviders): Promise<User[]> {
        if (except_user_id)
            return this.ormRepository.find({
                where: { id: Not(except_user_id) },
            });

        return this.ormRepository.find();
    }

    public findById(id: string): Promise<User | undefined> {
        return this.ormRepository.findOne(id);
    }

    public findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({
            where: { email },
        });
    }

    public save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
