"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensureAuthenticated_1 = __importDefault(require("@shared/infra/http/middlewares/ensureAuthenticated"));
const AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.use(ensureAuthenticated_1.default);
// appointmentsRouter.get('/', async (request, response) => {
//     const appointmentRepository = getCustomRepository(AppointmentsRepository);
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });
const appointmentsController = new AppointmentsController_1.default();
appointmentsRouter.post('/', appointmentsController.create);
exports.default = appointmentsRouter;
