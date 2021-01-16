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
const FakeCacheProvider_1 = __importDefault(require("@shared/container/providers/cache/fakes/FakeCacheProvider"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeHashProvider_1 = __importDefault(require("../providers/hash/FakeHashProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
let createUser;
describe('CreateUser', () => {
    beforeEach(() => {
        createUser = new CreateUserService_1.default(new FakeUsersRepository_1.default(), new FakeHashProvider_1.default(), new FakeCacheProvider_1.default());
    });
    it('should be able to create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        expect(user).toHaveProperty('id');
    }));
    it('should not be able to create new user with an already taken email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield expect(createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
