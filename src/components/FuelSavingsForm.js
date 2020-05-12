import React from 'react';
import {func} from 'prop-types';
import {fuelSavings} from '../types';

const FuelSavingsForm = ({fuelSavings, onSaveClick, onChange}) => (
  <div>
    <h2>Fuel Savings Analysis</h2>
    <table>
      <tbody>

        <tr>
          <td><label htmlFor="milesDriven">Miles Driven</label></td>
        </tr>
        <tr>
          <td><label>Date Modified</label></td>
          <td>{fuelSavings.dateModified}</td>
        </tr>
      </tbody>
    </table>

    <hr/>
    <input type="submit" value="Save" onClick={onSaveClick}/>
  </div>
);

FuelSavingsForm.propTypes = {
  onSaveClick: func.isRequired,
  onChange: func.isRequired,
  fuelSavings: fuelSavings.isRequired
};

export default FuelSavingsForm;
