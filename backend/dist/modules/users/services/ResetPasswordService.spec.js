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
const FakeUserTokenRepository_1 = __importDefault(require("../repositories/fakes/FakeUserTokenRepository"));
const ResetPasswordService_1 = __importDefault(require("./ResetPasswordService"));
let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPassword;
describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeUserTokensRepository = new FakeUserTokenRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        resetPassword = new ResetPasswordService_1.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
    });
    it('should be able to reset the password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: 'old-password-1234',
        });
        const { token } = yield fakeUserTokensRepository.generateToken(user.id);
        const newPassword = 'new-password-1234';
        const generateHash = jest.spyOn(fakeHashProvider, 'generate');
        yield resetPassword.execute({
            token,
            password: newPassword,
            password_confirmation: newPassword,
        });
        const updatedUser = yield fakeUsersRepository.findById(user.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe(newPassword);
        expect(generateHash).toBeCalledWith(newPassword);
    }));
    it('should not be able to reset the password with non-existent token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(resetPassword.execute({
            token: 'non-existing-token',
            password: '1234',
            password_confirmation: '1234',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to reset the password with non-existent user', () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield fakeUserTokensRepository.generateToken('non-existing-user');
        yield expect(resetPassword.execute({
            token,
            password: '1234',
            password_confirmation: '1234',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to reset the password if passed more than 2 hours', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: 'old-password-1234',
        });
        const { token } = yield fakeUserTokensRepository.generateToken(user.id);
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });
        yield expect(resetPassword.execute({
            token,
            password: 'new-password-1234',
            password_confirmation: 'new-password-1234',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
