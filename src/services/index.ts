import { AuthService } from './authServices';
import { ProjectService } from './projectServices';

export default {
    auth: new AuthService(),
    project: new ProjectService(),
};