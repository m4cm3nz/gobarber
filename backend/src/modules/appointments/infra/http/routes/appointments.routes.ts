import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointmentRepository = getCustomRepository(AppointmentsRepository);
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });

const appointmentsController = new AppointmentsController();
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
