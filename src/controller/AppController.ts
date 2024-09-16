import { Request, Response } from "express";
import { AppService } from "../service/App.service";
import { HttpException } from "../errors/HttpException";

export class AppController {

    async upload(req: Request, res: Response) {

        if (!req.file) throw new HttpException(404, 'File not found.');

        const { originalname, path, mimetype } = req.file;

        const appService = new AppService(mimetype, originalname, path);

        const result = await appService.upload();

        const leitura = appService.transformResponse(result);

        if (!leitura) throw new HttpException(400, 'Bad request')

        return res.json({ leitura });
    }
}
