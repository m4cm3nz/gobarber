"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensureAuthenticated_1 = __importDefault(require("@shared/infra/http/middlewares/ensureAuthenticated"));
const celebrate_1 = require("celebrate");
const AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
const ProviderAppointmentsController_1 = __importDefault(require("../controllers/ProviderAppointmentsController"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.use(ensureAuthenticated_1.default);
const appointmentsController = new AppointmentsController_1.default();
appointmentsRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        providerId: celebrate_1.Joi.string().uuid().required(),
        date: celebrate_1.Joi.date(),
    },
}), appointmentsController.create);
const providerAppointmentsController = new ProviderAppointmentsController_1.default();
appointmentsRouter.get('/me', providerAppointmentsController.index);
exports.default = appointmentsRouter;
