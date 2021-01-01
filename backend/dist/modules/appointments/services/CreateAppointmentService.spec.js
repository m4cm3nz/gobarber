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
const FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
const CreateAppointmentService_1 = __importDefault(require("./CreateAppointmentService"));
describe('CreateAppointment', () => {
    it('should be able to create a new appointment', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        const createAppointment = new CreateAppointmentService_1.default(fakeAppointmentsRepository);
        const appointment = yield createAppointment.execute({
            date: new Date(),
            providerId: '1',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1');
    }));
    it('should not be able to create two appointment on the same time', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        const createAppointment = new CreateAppointmentService_1.default(fakeAppointmentsRepository);
        const appointmentDate = new Date(2020, 4, 10, 11);
        yield createAppointment.execute({
            date: appointmentDate,
            providerId: '1',
        });
        expect(createAppointment.execute({
            date: appointmentDate,
            providerId: '1',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
