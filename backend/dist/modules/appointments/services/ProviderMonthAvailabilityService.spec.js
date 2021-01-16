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
const FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
const ProviderMonthAvailabilityService_1 = __importDefault(require("./ProviderMonthAvailabilityService"));
let providerMonthAvailabilityService;
let fakeAppointmentsRepository;
describe('ProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        providerMonthAvailabilityService = new ProviderMonthAvailabilityService_1.default(fakeAppointmentsRepository);
    });
    it('should be able to list provider month availability', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 8, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 9, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 10, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 11, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 12, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 13, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 14, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 15, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 16, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 17, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 9, 0, 0),
        });
        const availability = yield providerMonthAvailabilityService.execute({
            provider_id: 'fake-provider-id',
            month: 1,
            year: 2021,
        });
        expect(availability).toEqual(expect.arrayContaining([
            { day: 8, available: true },
            { day: 9, available: false },
            { day: 10, available: true },
            { day: 11, available: true },
        ]));
    }));
});
