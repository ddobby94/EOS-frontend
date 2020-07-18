import { BaseApiFunctions } from './baseAPI';

export class ProjectService extends BaseApiFunctions {
    private URLS = {
        UPLOAD_FILE: 'https://jsonplaceholder.typicode.com/todos/1',
    };

    uploadFile = (file: File) => {
        console.log({ file });
        const data = new FormData()
        data.append('file', file);

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

}

export default ProjectService;
