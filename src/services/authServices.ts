import { SimpleObject } from '../types/commonTypes';

type fetchFunction = (url: string, options?: SimpleObject) => Promise<any>;

class BaseApiFunctions {
    protected baseApiOptions = {
        method: 'GET',
    };

    protected fetchApi: fetchFunction = (url, options = this.baseApiOptions) => {
        return fetch(url, options)
            .then((resp) => resp.json());
    }
}


export class AuthService extends BaseApiFunctions {
    private URLS = {
        TEST: 'https://jsonplaceholder.typicode.com/todos/1',
    };

    constructor() {
        super();
    }

    fetchTestData = () => {
        return this.fetchApi(this.URLS.TEST);
    }
}

export default AuthService;