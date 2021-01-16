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
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const FakeHashProvider_1 = __importDefault(require("../providers/hash/FakeHashProvider"));
const UpdateProfileService_1 = __importDefault(require("./UpdateProfileService"));
let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        updateProfile = new UpdateProfileService_1.default(fakeUsersRepository, fakeHashProvider);
    });
    it('should be able to update the user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        const updatedUser = yield updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
        });
        expect(updatedUser.name).toBe('Jonh Mac Doe');
        expect(updatedUser.email).toBe('johnmacdoe@example.com');
    }));
    it('should be able to update the password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        const updatedUser = yield updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
            old_password: '1234',
            password: '123456',
            password_confirmation: '123456',
        });
        expect(updatedUser.password).toBe('123456');
    }));
    it('should not be able to update the password without old password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
            password: '123456',
            password_confirmation: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to update the password without password confirmation', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
            old_password: '1234',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it("should not be able to update the password when password confirmation doesn't match", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
            old_password: '1234',
            password: '123456',
            password_confirmation: 'abcd',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to update the password with wrong old password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
            old_password: 'incorret-password',
            password: '123456',
            password_confirmation: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to update profile for a non existent user.', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(updateProfile.execute({
            user_id: 'non-existent-user-id',
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to update the profile with an already taken email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeUsersRepository.create({
            name: 'Jonh',
            email: 'john@example.com',
            password: '1234',
        });
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'john@example.com',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
