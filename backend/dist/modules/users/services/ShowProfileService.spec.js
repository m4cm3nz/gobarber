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
const ShowProfileService_1 = __importDefault(require("./ShowProfileService"));
let fakeUsersRepository;
let showProfile;
describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        showProfile = new ShowProfileService_1.default(fakeUsersRepository);
    });
    it('should be able to show the profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        const profile = yield showProfile.execute({ user_id: user.id });
        expect(profile.name).toBe('Jonh Doe');
        expect(profile.email).toBe('johndoe@example.com');
    }));
    it('should no be able to show the profile for non-existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(showProfile.execute({
            user_id: 'non-existing-user-id',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
