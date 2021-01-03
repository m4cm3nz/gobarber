import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async generateToken(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            token: uuid(),
            user_id,
        });

        return this.ormRepository.save(userToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        return this.ormRepository.findOne({
            where: { token },
        });
    }
}

export default FakeUserTokensRepository;
