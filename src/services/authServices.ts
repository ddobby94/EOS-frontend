import { BaseApiFunctions } from './baseAPI';
import { SendRegisterDetails, SendLoginDetails } from '../redux/helpers/types';

export class AuthService extends BaseApiFunctions {
    private URLS = {
        TEST: 'https://jsonplaceholder.typicode.com/todos/1',
        REGISTER: 'https://jsonplaceholder.typicode.com/todos/1',
        LOGIN: 'https://jsonplaceholder.typicode.com/todos/1',
    };

    fetchTestData = (d) => {
        console.log({ d });
        return this.fetchApi(this.URLS.TEST);
    }

    sendRegisterData = (details: SendRegisterDetails) => {
        const options = {
            ...this.postApiOptions,
            body: JSON.stringify(details),
        };

        return this.fetchApi(this.URLS.REGISTER, options);
    }

    sendLogin = (details: SendLoginDetails) => {
        const options = {
            ...this.postApiOptions,
            body: JSON.stringify(details),
        };

        return this.fetchApi(this.URLS.LOGIN, options);
    }

}

export default AuthService;
