"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const date_fns_1 = require("date-fns");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const tsyringe_1 = require("tsyringe");
let CreateAppointmentService = class CreateAppointmentService {
    constructor(appointmentsRepository, notificationsRepository, cacheProvider) {
        this.appointmentsRepository = appointmentsRepository;
        this.notificationsRepository = notificationsRepository;
        this.cacheProvider = cacheProvider;
    }
    execute({ userId, providerId, date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentDate = date_fns_1.startOfHour(date);
            if (date_fns_1.isBefore(appointmentDate, Date.now()))
                throw new AppError_1.default("You can't create an appointment on a past date");
            if (userId === providerId)
                throw new AppError_1.default("You can't create an appoimento to your self");
            if (date_fns_1.getHours(appointmentDate) < 8 || date_fns_1.getHours(appointmentDate) > 17)
                throw new AppError_1.default('You can only create appointment beteween 8am and 5pm');
            const findAppointmentInSameDate = yield this.appointmentsRepository.findByDate(appointmentDate);
            if (findAppointmentInSameDate)
                throw new AppError_1.default('This appointment is already booked', 422);
            const appointment = yield this.appointmentsRepository.create({
                userId,
                providerId,
                date: appointmentDate,
            });
            const dateFormatted = date_fns_1.format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
            yield this.notificationsRepository.create({
                recipient_id: providerId,
                content: `Novo agendamento para o dia ${dateFormatted}`,
            });
            yield this.cacheProvider.invalidate(`provider-appointments:${providerId}:${date_fns_1.format(appointmentDate, 'yyyy-M-d')}`);
            return appointment;
        });
    }
};
CreateAppointmentService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('AppointmentsRepository')),
    __param(1, tsyringe_1.inject('NotificationsRepository')),
    __param(2, tsyringe_1.inject('CacheProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateAppointmentService);
exports.default = CreateAppointmentService;
