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
const FakeUsersRepository_1 = __importDefault(require("@modules/users/repositories/fakes/FakeUsersRepository"));
const FakeCacheProvider_1 = __importDefault(require("@shared/container/providers/cache/fakes/FakeCacheProvider"));
const ListProvidersService_1 = __importDefault(require("./ListProvidersService"));
let fakeUsersRepository;
let listProvidersService;
let fakeCacheProvider;
describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeCacheProvider = new FakeCacheProvider_1.default();
        listProvidersService = new ListProvidersService_1.default(fakeUsersRepository, fakeCacheProvider);
    });
    it('should be able to list the providers', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });
        const anotherUser = yield fakeUsersRepository.create({
            name: 'Jonh Tre',
            email: 'johntre@example.com',
            password: '1234',
        });
        const loggedUser = yield fakeUsersRepository.create({
            name: 'Jonh Qua',
            email: 'johnqua@example.com',
            password: '1234',
        });
        const providers = yield listProvidersService.execute({
            user_id: loggedUser.id,
        });
        expect(providers).toEqual([user, anotherUser]);
    }));
});
