import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, getAuthLoading } from '../redux/reducers/authReducer';
import { fetchAuthData } from '../redux/actions/authActions';
import { Button, TextField } from '@material-ui/core';
import { AuthState } from '../redux/helpers/store';
import './styles/LoginPage.scss';

interface LoginPageProps extends React.Props<LoginPage> {
    fetchAuthData: () => void;
    user: AuthState['user'];
    children: string;
    isLoading: boolean;
};

interface LoginPageStates {
    isRegister: boolean;
};

export class LoginPage extends React.Component<LoginPageProps, LoginPageStates> {
    state = {
        isRegister: false,
    }

    loadAuthData = () => {
        this.props.fetchAuthData();
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-sidebar">
                    <h2>Welcome to</h2>
                    <h1>EOS</h1>
                    <div className="login-main">
                        <TextField
                            className="login-input"
                            id="outlined-basic"
                            label="Login"
                            variant="outlined"
                        />
                        <TextField
                            className="login-input"
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                        />
                        <Button
                            onClick={this.loadAuthData}
                            color="primary"
                            variant="contained"
                        >
                            FETCH AUTH DATA
                        </Button>
                        <p>Logged in user: </p>
                        {this.props.user && this.props.user.userId && (<p>
                            UID: {this.props.user.userId}
                        </p>)}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
