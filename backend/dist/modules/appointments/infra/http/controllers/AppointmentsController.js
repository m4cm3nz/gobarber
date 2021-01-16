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
const CreateAppointmentService_1 = __importDefault(require("@modules/appointments/services/CreateAppointmentService"));
const tsyringe_1 = require("tsyringe");
class AppointmentsController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { providerId, date } = request.body;
            const userId = request.user.id;
            const createAppointment = tsyringe_1.container.resolve(CreateAppointmentService_1.default);
            const appointment = yield createAppointment.execute({
                userId,
                providerId,
                date,
            });
            return response.json(appointment);
        });
    }
}
exports.default = AppointmentsController;
