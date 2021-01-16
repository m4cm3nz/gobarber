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
const ProviderDayAvailabilityService_1 = __importDefault(require("./ProviderDayAvailabilityService"));
let providerDayAvailabilityService;
let fakeAppointmentsRepository;
describe('ProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        providerDayAvailabilityService = new ProviderDayAvailabilityService_1.default(fakeAppointmentsRepository);
    });
    it('should be able to list provider day availability', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 14, 0, 0),
        });
        yield fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 15, 0, 0),
        });
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 0, 10, 11).getTime();
        });
        const availability = yield providerDayAvailabilityService.execute({
            provider_id: 'fake-provider-id',
            day: 10,
            month: 1,
            year: 2021,
        });
        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true },
        ]));
    }));
});
