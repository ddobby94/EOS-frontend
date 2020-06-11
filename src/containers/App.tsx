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

interface AppProps {
	isLoggedIn: boolean;
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
			</div>
		);
    }
}


const mapStateToProps = (state) => ({
	isLoggedIn: isUserLoggedIn(state),
})

export default hot(module)(connect(
	mapStateToProps
)(App));
