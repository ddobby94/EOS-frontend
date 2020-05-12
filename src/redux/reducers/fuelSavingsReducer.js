import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../actions/actionTypes';
import objectAssign from 'object-assign';

const initialState = {
    fuelSavings: {
        newMpg: '',
        tradeMpg: '',
        newPpg: '',
        tradePpg: '',
        milesDriven: '',
        milesDrivenTimeframe: 'week',
        displayResults: false,
        dateModified: null,
        necessaryDataIsProvidedToCalculateSavings: false,
        savings: {
          monthly: 0,
          annual: 0,
          threeYear: 0
        }
    }
};

export default function fuelSavingsReducer(state = initialState.fuelSavings, action) {
    let newState;

    switch (action.type) {
        case SAVE_FUEL_SAVINGS:
        return objectAssign({}, state, {dateModified: action.dateModified});

        case CALCULATE_FUEL_SAVINGS:
        newState = objectAssign({}, state);
        newState[action.fieldName] = action.value;
        newState.dateModified = action.dateModified;

        return newState;

        default:
        return state;
    }
}
