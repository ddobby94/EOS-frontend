import { fetchFunction } from '../types/commonTypes';

export class BaseApiFunctions {
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
