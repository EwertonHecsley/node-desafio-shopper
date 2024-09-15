import { Request, Response } from "express";
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class AppController {
    async upload(req: Request, res: Response) {



        if (!process.env.GEMINI_API_KEY) {
            return res.status(401).json({ message: 'GEMINI_API_KEY is required' });
        }

        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

        if (req.file) {
            const { mimetype, originalname, path } = req.file;

            const uploadResonse = await fileManager.uploadFile(path, {
                mimeType: mimetype,
                displayName: originalname
            })

            const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

            const model = genAi.getGenerativeModel(
                {
                    model: 'gemini-1.5-pro',
                }
            )

            const result = await model.generateContent([
                {
                    fileData: {
                        mimeType: uploadResonse.file.mimeType,
                        fileUri: uploadResonse.file.uri
                    }
                },
                {
                    text: 'qual a quantidade de kWh consumido neste medidor?, retorne a resposta do medidor sempre entre asteriscos **'
                }
            ]);

            console.log(result.response.text());
        }





        return res.json("Estou na rota post");
    }
}
