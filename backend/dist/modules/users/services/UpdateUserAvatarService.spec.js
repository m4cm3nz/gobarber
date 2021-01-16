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
const FakeStorageProvider_1 = __importDefault(require("@shared/container/providers/storage/fakes/FakeStorageProvider"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const UpdateUserAvatarService_1 = __importDefault(require("./UpdateUserAvatarService"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
let fakeUsersRepository;
let updateUserAvatar;
let fakeStorageProvider;
describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeStorageProvider = new FakeStorageProvider_1.default();
        updateUserAvatar = new UpdateUserAvatarService_1.default(fakeUsersRepository, fakeStorageProvider);
    });
    it('should be able to update the user avatar', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });
        expect(user.avatar).toBe('avatar.jpg');
    }));
    it('should not be able to update avatar for a non existent user.', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(updateUserAvatar.execute({
            user_id: 'non-existent-user',
            avatarFileName: 'avatar.jpg',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should delete old avatar when updating a new one', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        yield updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar-1.jpg',
        });
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
        yield updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar-2.jpg',
        });
        expect(deleteFile).toHaveBeenCalledWith('avatar-1.jpg');
        expect(user.avatar).toBe('avatar-2.jpg');
    }));
});
