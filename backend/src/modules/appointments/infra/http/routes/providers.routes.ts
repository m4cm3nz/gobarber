import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);

const providersController = new ProvidersController();
providersRouter.get('/', providersController.index);

const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
providersRouter.get(
    '/:provider_id/month-availability',
    providerMonthAvailabilityController.index,
);

const providerDayAvailabilityController = new ProviderDayAvailabilityController();
providersRouter.get(
    '/:provider_id/day-availability',
    providerDayAvailabilityController.index,
);

export default providersRouter;
