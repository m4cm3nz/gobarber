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
const FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
const ListProviderAppointmentsService_1 = __importDefault(require("./ListProviderAppointmentsService"));
let listProviderAppointments;
let fakeAppointmentsRepository;
let fakeCacheProvider;
describe('ListProvidersAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        fakeCacheProvider = new FakeCacheProvider_1.default();
        listProviderAppointments = new ListProviderAppointmentsService_1.default(fakeAppointmentsRepository, fakeCacheProvider);
    });
    it("should be able to list provider's appoiments on a specific day", () => __awaiter(void 0, void 0, void 0, function* () {
        const firstAppointment = yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 14, 0, 0),
        });
        const secondAppointment = yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 15, 0, 0),
        });
        const appointments = yield listProviderAppointments.execute({
            provider_id: 'fake-provider-id',
            day: 10,
            month: 1,
            year: 2021,
        });
        expect(appointments).toEqual([firstAppointment, secondAppointment]);
    }));
});
