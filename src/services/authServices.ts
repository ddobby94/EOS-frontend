import { SimpleObject } from '../types/commonTypes';

type fetchFunction = (url: string, options?: SimpleObject) => Promise<any>;

class BaseApiFunctions {
    protected baseApiOptions = {
        method: 'GET',
    };

    protected postApiOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    protected fetchApi: fetchFunction = (url, options = this.baseApiOptions) => {
        return fetch(url, options)
            .then((resp) => resp.json());
    }
}


export class AuthService extends BaseApiFunctions {
    private URLS = {
        TEST: 'https://jsonplaceholder.typicode.com/todos/1',
        REGISTER: 'https://jsonplaceholder.typicode.com/todos/1',
    };

    constructor() {
        super();
    }

    fetchTestData = (d) => {
        console.log({ d });
        return this.fetchApi(this.URLS.TEST);
    }

    sendRegisterData = (details) => {
        const options = {
            ...this.postApiOptions,
            body: JSON.stringify(details),
        };

        return this.fetchApi(this.URLS.REGISTER, options);
    }

}

export default AuthService;