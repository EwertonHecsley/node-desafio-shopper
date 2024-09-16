import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';


export class ReadFileService {

    constructor(
        private mimeType: string,
        private originalName: string,
        private path: string
    ) { }

    async execute(): Promise<string> {

        if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is required');

        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

        const uploadResonse = await fileManager.uploadFile(this.path, {
            mimeType: this.mimeType,
            displayName: this.originalName
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

        return result.response.text();
    }
}