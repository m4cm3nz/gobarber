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
const typeorm_1 = require("typeorm");
const Appointment_1 = __importDefault(require("../entities/Appointment"));
class AppointmentsRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Appointment_1.default);
    }
    findByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAppointment = yield this.ormRepository.findOne({
                where: { date },
            });
            return findAppointment;
        });
    }
    create({ userId, providerId, date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = this.ormRepository.create({
                user_id: userId,
                provider_id: providerId,
                date,
            });
            yield this.ormRepository.save(appointment);
            return appointment;
        });
    }
    findAllInMonthFromProvider({ provider_id, month, year, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedMonth = String(month).padStart(2, '0');
            return this.ormRepository.find({
                where: {
                    provider_id,
                    date: typeorm_1.Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`),
                },
            });
        });
    }
    findAllInDayFromProvider({ provider_id, day, month, year, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedDay = String(day).padStart(2, '0');
            const parsedMonth = String(month).padStart(2, '0');
            const appointments = yield this.ormRepository.find({
                where: {
                    provider_id,
                    date: typeorm_1.Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`),
                },
            });
            return appointments;
        });
    }
}
exports.default = AppointmentsRepository;
