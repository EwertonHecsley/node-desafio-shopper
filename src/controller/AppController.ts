import { Request, Response } from "express";

export class AppController {
    async upload(_req: Request, res: Response) {
        return res.json("Estou na rota post")
    }
}