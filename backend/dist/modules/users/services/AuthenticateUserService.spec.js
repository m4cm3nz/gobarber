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
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeHashProvider_1 = __importDefault(require("../providers/hash/FakeHashProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const AuthenticateUserService_1 = __importDefault(require("./AuthenticateUserService"));
let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        authenticateUser = new AuthenticateUserService_1.default(fakeUsersRepository, fakeHashProvider);
    });
    it('should be able to authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        const response = yield authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '1234',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    }));
    it('should no be able to authenticate with unregistered user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUser.execute({
            email: 'unregistred-johndoe@example.com',
            password: '1234',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should no be able to authenticate with wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: 'right-password',
        });
        yield expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'wrong-password',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
