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
const Appointment_1 = __importDefault(require("@modules/appointments/infra/typeorm/entities/Appointment"));
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
class FakeAppointmentsRepository {
    constructor() {
        this.appointments = [];
    }
    findByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointments.find(appointment => date_fns_1.isEqual(appointment.date, date));
        });
    }
    create({ userId, providerId, date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = Object.assign(Object.assign({}, new Appointment_1.default()), { id: uuid_1.v4(), date, user_id: userId, provider_id: providerId });
            this.appointments.push(appointment);
            return appointment;
        });
    }
    findAllInMonthFromProvider({ provider_id, month, year, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = this.appointments.filter(appointment => appointment.provider_id === provider_id &&
                date_fns_1.getMonth(appointment.date) + 1 === month &&
                date_fns_1.getYear(appointment.date) === year);
            return appointments;
        });
    }
    findAllInDayFromProvider({ provider_id, day, month, year, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = this.appointments.filter(appointment => appointment.provider_id === provider_id &&
                date_fns_1.getDate(appointment.date) === day &&
                date_fns_1.getMonth(appointment.date) + 1 === month &&
                date_fns_1.getYear(appointment.date) === year);
            return appointments;
        });
    }
}
exports.default = FakeAppointmentsRepository;
