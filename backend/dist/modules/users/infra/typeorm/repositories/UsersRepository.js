"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    findAllProviders({ except_user_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (except_user_id)
                return this.ormRepository.find({
                    where: { id: typeorm_1.Not(except_user_id) },
                });
            return this.ormRepository.find();
        });
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
