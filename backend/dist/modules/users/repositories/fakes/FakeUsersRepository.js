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
const User_1 = __importDefault(require("@modules/users/infra/typeorm/entities/User"));
const uuid_1 = require("uuid");
class FakeUsersRepository {
    constructor() {
        this.users = [];
    }
    create({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign(Object.assign({}, new User_1.default()), { id: uuid_1.v4(), name, email, password });
            this.users.push(user);
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find(user => user.id === id);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find(user => user.email === email);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
            this.users[findIndex] = user;
            return user;
        });
    }
}
exports.default = FakeUsersRepository;
