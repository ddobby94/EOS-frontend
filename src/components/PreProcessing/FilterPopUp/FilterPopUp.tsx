import * as React from 'react';
import '../../_styles/common.scss';
import PopUp from '../../common/PopUp';
import { FormControlLabel, Checkbox, TextField, Button, Slider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SectionBox from '../../common/SectionBox';
import { addNewFilter } from '../../../redux/actions/projectActions';
import { getVariables } from '../../../redux/reducers/projectReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Variable } from '../../_types/DataTable';
import { isActiveClassName } from '../../../utils/stylingHelpers';
import { METRICS } from '../../../styles/styles';
import { FilterPopUpUseStyles } from '../../../styles/materialUIoverrides';
import { ToggleGroupSectionBoxTitleProps, FILTER_TYPES, FilterPopUpProps, FilterTypes } from '../../_types/PreProcessing';
import VariableSelectableChipList from './ChipListContainer';

const checkValidRange = (selectedVariable) => typeof selectedVariable?.min === 'number' && selectedVariable?.min < selectedVariable?.max - 1;

const ToggleGroupSectionBoxTitle: React.FunctionComponent<ToggleGroupSectionBoxTitleProps> = ({
    selectedType,
    setselectedType,
}) => (
    <div
        className="togglegroup"
    >
        <Button
            className={isActiveClassName(selectedType === FILTER_TYPES.RANGES, 'togglegroup-ranges')}
            onClick={() => setselectedType(FILTER_TYPES.RANGES)}
            children="Set ranges"
            />
        <Button
            className={isActiveClassName(selectedType === FILTER_TYPES.VALUES, 'togglegroup-values')}
            onClick={() => setselectedType(FILTER_TYPES.VALUES)}
            children="Set values"
        />
    </div>
);

export const FilterPopUp: React.FunctionComponent<FilterPopUpProps> = ({
    onClose,
    variables,
}) => {
    const [filterName, setFilterName] = React.useState<string>('');
    const [selectedType, setselectedType] = React.useState<FilterTypes>(FILTER_TYPES.RANGES);
    const [rangesValues, setRangesValues] = React.useState<number[]>([0, 100]);
    const [includeBorders, setIncludeBorders] = React.useState<boolean>(false);
    const [createAnother, setCreateAnother] = React.useState<boolean>(false);
    const [selectedVariable, setSelectedVariable] = React.useState<Variable | null>();

    const classes = FilterPopUpUseStyles();

    const onCreate = () => {
        console.log('TODO: filterName, rangeOrValue, selectedVariable, includeBorders, min, max, valuesToInclude, valuesToExclude ');
    }

    const handleChange = (event: any, newValue: number | number[]) => {
        setRangesValues(newValue as number[]);
    };

    const onAutoCompleteSelected = (e, variable: Variable | null) => {
        console.log({ e });
        setSelectedVariable(variable);
        if (checkValidRange(variable) && variable?.min) {
            setRangesValues([variable?.min, variable?.max]);
        }
    }

    const hasValidRange = checkValidRange(selectedVariable);


    return (
        <PopUp
            title="PRE-PROCESSING FILTER"
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
                <div className="filterBase-container">
                    <TextField
                        className="filterBase-name"
                        id="outlined-basic"
                        label="Filter Name"
                        variant="outlined"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                    <Autocomplete
                        classes={{
                            root: classes.root
                        }}
                        className="filterBase-autocomplete"
                        options={variables}
                        getOptionLabel={(option) => option.name}
                        onChange={onAutoCompleteSelected}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select a variable"
                                variant="outlined"
                            />
                        )}
                    />
                    <h4 className="filterBase-selected">Selected type: <p>{selectedVariable?.type || 'N/A'}</p></h4>
                </div>
            </SectionBox>
            <SectionBox
                title=""
                titleComponent={<ToggleGroupSectionBoxTitle selectedType={selectedType} setselectedType={setselectedType} />}
                style={{
                    paddingTop: 0,
                    marginTop: METRICS.big_spacing,
                }}
            >
                {selectedType === FILTER_TYPES.RANGES ? (
                    <>
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
                                value={rangesValues}
                                onChange={handleChange}
                                classes={{
                                    root: classes.slider,
                                }}
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
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <VariableSelectableChipList type="INCLUDE" />
                            <VariableSelectableChipList type="EXCLUDE" />
                        </div>
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
