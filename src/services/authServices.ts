import { BaseApiFunctions } from './baseAPI';

export class AuthService extends BaseApiFunctions {
    private URLS = {
        TEST: 'https://jsonplaceholder.typicode.com/todos/1',
        REGISTER: 'https://jsonplaceholder.typicode.com/todos/1',
    };

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
