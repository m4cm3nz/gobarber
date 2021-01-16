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
const FakeMailProvider_1 = __importDefault(require("@shared/container/providers/email/fakes/FakeMailProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const FakeUserTokenRepository_1 = __importDefault(require("../repositories/fakes/FakeUserTokenRepository"));
const SendForgotPasswordEmailService_1 = __importDefault(require("./SendForgotPasswordEmailService"));
let fakeMailProvider;
let fakeUsersRepository;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeUserTokensRepository = new FakeUserTokenRepository_1.default();
        fakeMailProvider = new FakeMailProvider_1.default();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService_1.default(fakeUsersRepository, fakeUserTokensRepository, fakeMailProvider);
    });
    it('should be able to recover the password using the email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        yield sendForgotPasswordEmail.execute('johndoe@example.com');
        expect(sendMail).toHaveBeenCalled();
    }));
    it('should no be able to recover a non-existen user password.', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordEmail.execute('johndoe@example.com')).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should generate forgot password token when sending forgotten password email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        const generate = jest.spyOn(fakeUserTokensRepository, 'generateToken');
        yield sendForgotPasswordEmail.execute('johndoe@example.com');
        expect(generate).toHaveBeenCalledWith(user.id);
    }));
});
