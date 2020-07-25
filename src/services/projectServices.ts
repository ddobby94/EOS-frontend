import { BaseApiFunctions } from './baseAPI';
import { generateRequestPayload } from '../containers/_types/Project.types';

export class ProjectService extends BaseApiFunctions {
    private URLS = {
        UPLOAD_FILE: 'https://jsonplaceholder.typicode.com/todos/1',
        GENERATE_IV_SAMPLE: 'https://jsonplaceholder.typicode.com/todos/1',
    };

    uploadFile = (file: File) => {
        const data = new FormData()
        data.append('file', file);

        console.log({ file, data }); // REMOVE

        const options = {
            ...this.postApiOptions,
            headers: {
                ...this.postApiOptions.headers,
                'Content-Type': undefined,
            },
            body: data,
        };

        return this.fetchApi(this.URLS.UPLOAD_FILE, options);
    }

    generateIVsample = (...details: generateRequestPayload) => {
        console.log({ details });

        const options = {
            ...this.postApiOptions,
            body: JSON.stringify(details),
            // body: JSON.stringify({
            //     title: 'foo',
            //     body: 'bar',
            //     userId: 1
            // }),
        };

        return this.fetchApi(this.URLS.GENERATE_IV_SAMPLE, options, 3000);
    }
}

export default ProjectService;
