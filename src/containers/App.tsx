import { Route, Switch, Redirect } from "react-router-dom";
import AboutPage from "../components/AboutPage";
import LoginPage from "./LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import React from "react";
import { hot } from "react-hot-loader";
import { Dashboard } from "./Dashboard";
import ProjectContainer from "./project/ProjectContainer";
import { isUserLoggedIn } from "../redux/reducers/authReducer";
import { connect } from 'react-redux';
import { isLoadingSelector } from "../redux/reducers";
import { CircularProgress } from "@material-ui/core";

interface AppProps {
    isLoggedIn: boolean;
    isLoading: boolean;
}

const Loading = ({ isLoading }) => {
    if (!isLoading) {
        return <></>;
    }

    return (
        <div style={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1201,
        }} >
            <CircularProgress size={100} thickness={4} />
        </div>
    );
}

class App extends React.Component<AppProps> {
	checkLoggedInUser = () => {
		if (!this.props.isLoggedIn) {
			return (
				<Redirect
					to={'/login'}
				/>
			);
		}
	}

    render() {
		return (
			<div>
				{/* <div>
					<NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
					{' | '}
					<NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
				</div> */}
				<Switch>
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/newproject" component={ProjectContainer} />
					<Route path="/about" component={AboutPage} />
					<Route component={NotFoundPage} />
				</Switch>
				{this.checkLoggedInUser()}
                <Loading isLoading={this.props.isLoading} />
			</div>
		);
    }
}


const mapStateToProps = (state) => ({
    isLoggedIn: isUserLoggedIn(state),
    isLoading: isLoadingSelector(state),
})

export default hot(module)(connect(
	mapStateToProps
)(App));
