import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errors/HttpException";

export const httpErrorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    const { status, message } = err as HttpException;
    return res.status(status || 500).json({ message });
};