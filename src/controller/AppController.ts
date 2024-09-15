import { Request, Response } from "express";

export class AppController {
    async postApp(_req: Request, res: Response) {
        return res.json("Estou na rota post")
    }
}