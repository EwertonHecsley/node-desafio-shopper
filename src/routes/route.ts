import { Router } from 'express';
import { AppController } from '../controller/AppController';
import multer from '../config/multer';


const route = Router();

const appRoute = new AppController();

route.post('/upload', multer.single('image'), appRoute.upload);

export default route;