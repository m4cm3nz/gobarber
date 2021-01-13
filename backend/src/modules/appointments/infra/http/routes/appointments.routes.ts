import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentsController();
appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            providerId: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);

const providerAppointmentsController = new ProviderAppointmentsController();
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
