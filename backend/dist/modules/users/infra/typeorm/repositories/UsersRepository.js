"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
class UsersRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(User_1.default);
    }
    create({ name, email, password }) {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });
        return this.ormRepository.save(user);
    }
    findById(id) {
        return this.ormRepository.findOne(id);
    }
    findByEmail(email) {
        return this.ormRepository.findOne({
            where: { email },
        });
    }
    save(user) {
        return this.ormRepository.save(user);
    }
}
exports.default = UsersRepository;
