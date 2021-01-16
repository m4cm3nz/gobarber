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
const FakeNotificationsRepository_1 = __importDefault(require("@modules/notifications/repositories/fakes/FakeNotificationsRepository"));
const FakeCacheProvider_1 = __importDefault(require("@shared/container/providers/cache/fakes/FakeCacheProvider"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
const CreateAppointmentService_1 = __importDefault(require("./CreateAppointmentService"));
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let createAppointment;
let fakeCacheProvider;
describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        fakeNotificationsRepository = new FakeNotificationsRepository_1.default();
        fakeCacheProvider = new FakeCacheProvider_1.default();
        createAppointment = new CreateAppointmentService_1.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 0, 10, 12).getTime();
        });
    });
    it('should be able to create a new appointment', () => __awaiter(void 0, void 0, void 0, function* () {
        const appointment = yield createAppointment.execute({
            userId: 'fake-user-Id',
            date: new Date(2021, 0, 10, 13),
            providerId: 'fake-provider-id',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('fake-provider-id');
    }));
    it('should not be able to create two appointment on the same time', () => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentDate = new Date(2021, 0, 10, 13);
        yield createAppointment.execute({
            userId: 'fake-user-Id',
            date: appointmentDate,
            providerId: 'fake-provider-id',
        });
        yield expect(createAppointment.execute({
            userId: 'fake-user-Id',
            date: appointmentDate,
            providerId: 'fake-provider-id',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create appointments on past date', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createAppointment.execute({
            userId: 'fake-user-Id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 11),
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create an appointmen with the same user as provider', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createAppointment.execute({
            userId: 'fake-user-Id',
            providerId: 'fake-user-Id',
            date: new Date(2021, 0, 10, 13),
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to create an appointmen before 8am and after 5pm ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createAppointment.execute({
            userId: 'fake-user-Id',
            providerId: 'fake-provider-Id',
            date: new Date(2021, 0, 11, 7),
        })).rejects.toBeInstanceOf(AppError_1.default);
        yield expect(createAppointment.execute({
            userId: 'fake-user-Id',
            providerId: 'fake-provider-Id',
            date: new Date(2021, 0, 11, 18),
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
