import { Router } from 'express';
import { AppController } from '../controller/AppController';

const route = Router();

const appRoute = new AppController();

route.post('/upload', appRoute.upload);

export default route;