import React from 'react';
import { shallow } from 'enzyme';
import FuelSavingsForm from './FuelSavingsForm';

/* Object builder. Could use test data builder pattern too.
   More info: http://blog.codeleak.pl/2014/06/test-data-builders-and-object-mother.html
   Returns fuel savings object. Overrides default values
   for any properties sent in on args object.
   Example: To get a fuel savings object like the
   default below, but with newMpg set to 10, call with
   getFuelSavings({ newMpg: 10});
*/
function getFuelSavings(args) {
  const defaultFuelSavings = {
    newMpg: 20,
    tradeMpg: 10,
    newPpg: 1.50,
    tradePpg: 1.50,
    milesDriven: 100,
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  };

  return {
    ...defaultFuelSavings,
    ...args
  };
}

describe('<FuelSavingsForm />', () => {

  it('should handle save button click', () => {
    const onSaveClick = jest.fn();
    const wrapper = shallow(<FuelSavingsForm
      onSaveClick={onSaveClick}
      onChange={jest.fn()}
      fuelSavings={getFuelSavings()}
    />);

    expect(onSaveClick).not.toBeCalled();
    wrapper.find('input[type="submit"]').simulate('click');
    expect(onSaveClick).toBeCalled();
  });

  it('should submit appState', () => {
    const fuelSavings = getFuelSavings();
    const onSaveClick = jest.fn();
    const wrapper = shallow(<FuelSavingsForm
      onSaveClick={onSaveClick}
      onChange={jest.fn()}
      fuelSavings={fuelSavings}
    />);

    expect(onSaveClick).not.toBeCalled();
    wrapper.find('input[type="submit"]').simulate('click');
    expect(onSaveClick).toBeCalled();
  });

});
