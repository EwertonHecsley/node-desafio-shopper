import { ReadFileService } from "./ReadFile.service";

export class AppService {

    readFileService: ReadFileService

    constructor(
        path: string,
        mimeType: string,
        originalName: string
    ) {
        this.readFileService = new ReadFileService(path, mimeType, originalName);
    }

    async upload(): Promise<string> {

        const result = await this.readFileService.execute();

        return result;

    }

    transformResponse(responseText: string): number | null {
        const regex = /\*\*([\d]+)/;
        const response = responseText.match(regex);

        if (response && response[1]) {
            return parseInt(response[1]);
        }

        return null;
    }
}
