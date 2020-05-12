import * as React from "react";
import { shallow, ShallowWrapper } from 'enzyme';
import { LoginPage } from './LoginPage';
import { LoginPageProps } from "./types/LoginPage.types";

describe('<LoginPage />', () => {
    let wrapper: ShallowWrapper;
    const mockFunction = () => {};
    const mockedProps: LoginPageProps = {
        fetchAuthData: mockFunction,
        user: {
            userId: 'foo',
            name: 'nameee',
        },
        children: '',
        isLoading: false,
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
