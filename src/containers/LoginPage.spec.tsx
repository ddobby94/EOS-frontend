import * as React from "react";
import { shallow, ShallowWrapper } from 'enzyme';
import { LoginPage } from './LoginPage';
import { LoginPageProps } from "./_types/LoginPage.types";
import { match } from 'react-router-dom';
import { History, Location } from "history";

describe('<LoginPage />', () => {
    let wrapper: ShallowWrapper;
    const mockFunction = () => {};

    const history = {} as History;
    const location = {} as Location;
    const match = {} as match;

    const mockedProps: LoginPageProps = {
        fetchAuthData: mockFunction,
        user: {
            userId: 'foo',
            name: 'nameee',
        },
        children: '',
        isLoading: false,
        history,
        location,
        match,
    }

    beforeEach(() => {
        wrapper = shallow(<LoginPage {...mockedProps} />);
    });

    it('should create', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should have basic HTML', () => {
        const logo = 'Logo';
        const imgBg = '.img-pic';
        const welcomeText = '.login-header';
        const loginMain = '.login-main';

        expect(wrapper.find(logo)).toBeTruthy();
        expect(wrapper.find(imgBg)).toBeTruthy();
        expect(wrapper.find(welcomeText)).toBeTruthy();
        expect(wrapper.find(loginMain)).toBeTruthy();
    });

    // it('should render Login components when state.isRegister === false', () => {
    //     const button = '.login-main Button';
    //     // const input = 'Input';

    //     expect(wrapper.find(button).text).toMatch('LOGIN');
    // });

});
