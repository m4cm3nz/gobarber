import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);

const providersController = new ProvidersController();
providersRouter.get('/', providersController.index);

export default providersRouter;
