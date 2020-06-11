import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, getAuthLoading } from '../redux/reducers/authReducer';
import { fetchAuthData } from '../redux/actions/authActions';
import { Button, TextField } from '@material-ui/core';
import './_styles/LoginPage.scss';
import { InputProps, LoginPageProps, LoginPageStates, LoginPageFuncTypes, InputItem } from './_types/LoginPage.types';
import { withRouter } from 'react-router-dom';

const IMG_SRC = require('../../public/images/login_bg.jpg');

const REGISTER_FIELDS: InputItem[] = [
    {
        label: 'Login',
        stateVal: 'email',
        type: '',
    },
    {
        label: 'Password',
        stateVal: 'pwd',
        type: 'password',
    },
    {
        label: 'Confirm Password',
        stateVal: 'confirmPwd',
        type: 'password',
    },
    {
        label: 'Full name',
        stateVal: 'name',
        type: '',
    },
    {
        label: 'Company name',
        stateVal: 'companyName',
        type: '',
    },
];

const LOGIN_FIELDS = REGISTER_FIELDS.slice(0, 2);

const Logo = () => (
    <div className="welcome-container">
        <h3 className="welcome-welcome">WELCOME TO</h3>
        <h2 className="welcome-eos">EOS</h2>
    </div>
);

const Input: React.FunctionComponent<InputProps> = ({ value, onChange, label, ...props }) => (
    <TextField
        className="login-input"
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        {...props}
    />
)


export class LoginPage extends React.Component<LoginPageProps, LoginPageStates> implements LoginPageFuncTypes {
    state = {
        isRegister: false,
        email: '',
        pwd: '',
        confirmPwd: '',
        name: '',
        companyName: '',
    }

    loadAuthData = () => {
        this.props.history.push('/');
        // this.props.fetchAuthData(this.state.email, this.state.pwd);
    }

    onChangeHandler = (key, e) => {
        // this is a complier bug, can't handle dynamic setState types properly
        this.setState<never>({ [key]: e.target.value });
    };

    changeState = (key, val) => {
        this.setState<never>({ [key]: val });
    }

    getLogin = () => (
        <>
            {LOGIN_FIELDS.map(({ label, stateVal, type }) => (
                <Input
                    key={label}
                    label={label}
                    value={this.state[stateVal]}
                    onChange={(e) => this.onChangeHandler(stateVal, e)}
                    type={type}
                />
            ))}
            <Button
                onClick={this.loadAuthData}
                className="login-button"
                color="primary"
                variant="contained"
                children="LOGIN"
            />
            <p>Don’t have an account? <a onClick={() => this.changeState('isRegister', true)}>SIGN UP</a></p>
        </>
    )


    getRegister = () => (
        <>
            {REGISTER_FIELDS.map(({ label, stateVal, type }) => (
                <Input
                    key={label}
                    label={label}
                    value={this.state[stateVal]}
                    onChange={(e) => this.onChangeHandler(stateVal, e)}
                    type={type}
                />
            ))}
            <Button
                onClick={this.loadAuthData}
                className="login-button"
                color="primary"
                variant="contained"
                children="REGISTER"
            />
            <p>Already have an account? <a onClick={() => this.changeState('isRegister', false)}>LOG IN</a></p>
        </>
    )

    getInputs = () => {
        if (this.state.isRegister) {
            return this.getRegister();
        }
        return this.getLogin();
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-sidebar">
                    <Logo />
                    <div className="login-main">
                        {this.getInputs()}
                    </div>
                </div>
                <div className="login-content">
                    <div className="img-container">
                        <div className="img-layer" ></div>
                        <img src={IMG_SRC} className="img-pic" alt="" />
                    </div>
                    <div className="login-textContainer">
                        <h1 className="login-header">STEP INTO THE FUTURE OF <strong>ARTIFICIAL INTELLIGENCE</strong></h1>
                        <h3 className="login-description">Check out how are we changing the datascience industry with our tool</h3>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    isLoading: getAuthLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
    fetchAuthData: bindActionCreators(fetchAuthData, dispatch),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage));
