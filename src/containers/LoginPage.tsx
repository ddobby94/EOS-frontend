import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions/fuelSavingsActions.js';

interface LoginPageProps extends React.Props<LoginPage> {
  actions: {
    saveFuelSavings: (a: {}) => void;
    calculateFuelSavings: (savings: {}, name: string, value: string) => void;
  };
  fuelSavings: {};
  children: string;
};

// interface IFooState {
//   // ...
// }

export class LoginPage extends React.Component<LoginPageProps> {
  saveFuelSavings = () => {
    this.props.actions.saveFuelSavings(this.props.fuelSavings);
  }

  calculateFuelSavings = e => {
    this.props.actions.calculateFuelSavings(this.props.fuelSavings, e.target.name, e.target.value);
  }

  render() {
    return (
        <>
            <h1>This is the login pageeeee</h1>
        </>
    );
  }
}

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
