import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions/fuelSavingsActions';
import { fetchAuthData } from '../redux/actions/authActions.ts';
import FuelSavingsForm from '../components/FuelSavingsForm';
import Button from '@material-ui/core/Button';

export class FuelSavingsPage extends React.Component {
  state = {
    login: '',
  }
  saveFuelSavings = () => {
    this.props.actions.saveFuelSavings(this.props.fuelSavings);
  }

  calculateFuelSavings = e => {
    this.props.actions.calculateFuelSavings(this.props.fuelSavings, e.target.name, e.target.value);
  }

  fetchAuth = () => this.props.fetchAuthData('fooo', {a : 11, b: 23});

  render() {
    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.fetchAuth}>
          Primary
        </Button>
        <FuelSavingsForm
          onSaveClick={this.saveFuelSavings}
          onChange={this.calculateFuelSavings}
          fuelSavings={this.props.fuelSavings}
        />
      </>
    );
  }
}

FuelSavingsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired,
  fetchAuthData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    fetchAuthData: bindActionCreators(fetchAuthData, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FuelSavingsPage);
