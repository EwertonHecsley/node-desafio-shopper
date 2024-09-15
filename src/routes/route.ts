import { Router } from 'express';
import { AppController } from '../controller/AppController';

const route = Router();

const appRoute = new AppController();

route.post('/app', appRoute.postApp);

export default route;