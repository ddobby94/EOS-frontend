import * as React from 'react';
import '../_styles/common.scss';
import PopUp, { PopUpProperties } from '../common/PopUp';
import { FormControlLabel, Checkbox, TextField, Button, Slider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SectionBox from '../common/SectionBox';
import { addNewFilter } from '../../redux/actions/projectActions';
import { getVariables } from '../../redux/reducers/projectReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Variable } from '../_types/DataTable';

interface FilterPopUpProps extends Omit<PopUpProperties, 'title' | 'onApprove'> {
    // onApprove?: () => void;
    variables: Variable[];
}

export const FilterPopUp: React.FunctionComponent<FilterPopUpProps> = ({
    onClose,
    variables,
}) => {
    // const [valtozo, fvAmivelAvaltozotLehetValtoztatni] = React.useState<valtozoTipusa>(valtozoKezdetiErteke);
    const [filterName, setFilterName] = React.useState<string>('');
    const [selectedType, setselectedType] = React.useState<'ranges' | 'values'>('ranges');
    const [valuesToInclude, setvaluesToInclude] = React.useState<string[]>([]);
    const [value, setValue] = React.useState<number[]>([0, 100]);
    const [includeBorders, setIncludeBorders] = React.useState<boolean>(false);
    const [createAnother, setCreateAnother] = React.useState<boolean>(false);
    const [selectedVariable, setSelectedVariable] = React.useState<Variable | null>();

    const onCreate = () => {
        console.log('TODO: filterName, rangeOrValue, selectedVariable, includeBorders, min, max, valuesToInclude, valuesToExclude ');
        console.log(setvaluesToInclude);
    }

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    console.log({ selectedVariable });

    // TODO fix the css everywhere

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!! if you declare a variable, but you are not using it yet there will be an error like:
    //  TS6133: 'a' is declared but its value is never read.
    //
    // if you use console.log(a) the error will go away.
    // or just use the variable as you are supposed to

    const onAutoCompleteSelected = (e, variable: Variable | null) => {
        console.log({ e });
        setSelectedVariable(variable);
    }

    const hasValidRange = typeof selectedVariable?.min === 'number' && selectedVariable?.min < selectedVariable?.max - 1;

    return (
        <PopUp
            title="PRE-PROCESSING FILTER"
            description="Lorem ipsum dolor sit amet!"
            onClose={onClose}
            onApprove={onCreate}
            positiveButtonText="CREATE"
            secondaryButtonComponent={(
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={createAnother}
                            onChange={() => setCreateAnother(!createAnother)}
                        />
                    }
                    className="popup-createButton"
                    label="Create another"
                />
            )}
        >

            <SectionBox
                    title="Base data"
                >
                <div className="login-container">
                    <TextField
                        className="login-input"
                        id="outlined-basic"
                        label="Filter Name"
                        variant="outlined"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                    <Autocomplete
                        className="login-variable"
                        id="combo-box-demo"
                        options={variables}
                        getOptionLabel={(option) => option.name}
                        onChange={onAutoCompleteSelected}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select a variable"
                                variant="outlined"
                            />
                        )}
                    />
                    <h4 className="login-selected">Selected type: {selectedVariable?.type}</h4>
                </div>
            </SectionBox>
            <SectionBox
                title=""
                titleComponent={
                    <div
                        className="togglegroup"
                    >

                        {/* TODO change this to https://material-ui.com/components/toggle-button/ */}

                        <Button
                            className="togglegroup-ranges"
                            onClick={() => setselectedType('ranges')}
                            children="Set ranges"
                        />
                        <Button
                            className="togglegroup-values"
                            onClick={() => setselectedType('values')}
                            children="Set values"
                        />
                    </div>
                }
            >
                {selectedType === 'ranges' ? (
                    <>
                        <h1>Selected Ranges</h1>
                        <p>is this working</p>
                        {/* TODO finish me add a CheckBox + Slider */}
                        {/*
                            Checkbox: https://material-ui.com/components/checkboxes/
                            SLIDER min-max: https://material-ui.com/components/slider/#range-slider
                            TODO need to import from material-ui
                        */}
                        {/* The values of the CheckBox AND the Slider should be stored in the variables created with React.useState */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={includeBorders}
                                    onChange={() => setIncludeBorders(!includeBorders)}
                                />
                            }
                            label="Include borders"
                        />
                        {hasValidRange ? (
                            <Slider
                                className="popup-slider"
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="on"
                                aria-labelledby="range-slider"
                                color="primary"
                                min={selectedVariable?.min}
                                max={selectedVariable?.max}
                            />
                        ) : (
                            <p>No valid range!</p>
                        )}
                    </>
                ) : (
                    <>
                        <h1>Selected values</h1>
                        <p>yep its working fine</p>
                        {/* TODO finish me add 2 input fields */}
                        {/* TODO add 2 ADD Button */}
                        {/* create 2 different arrays with React.useState<string[]>() */}
                        {/* When the user presses the ADD take the variable from the input and push it to the array */}
                        {/* Display the elements of the arrays like this: */}
                        <div>
                            <TextField
                                className="selected-input-One"
                                label="Selected input name 1"
                                variant="outlined"

                            />
                            <TextField
                                className="selected-input-Two"
                                label="Selected input name 2"
                                variant="outlined"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}

                            />
                            <Button
                                onClick={() => setselectedType('ranges')}
                                children="Set ranges"
                            />

                            <Button
                                onClick={() => setselectedType('ranges')}
                                children="Set ranges"
                            />
                        </div>
                        {valuesToInclude.map((value, i) => (
                            <p key={`${value}-${i}`}>{value}-{i}</p>
                        ))}
                        {/* you can change the <p> to https://material-ui.com/components/chips/  when displaying the array */}
                    </>
                )}
            </SectionBox>
        </PopUp>
    );
}


const mapStateToProps = (s) => ({
    variables: getVariables(s),
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedFile: bindActionCreators(addNewFilter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopUp);
