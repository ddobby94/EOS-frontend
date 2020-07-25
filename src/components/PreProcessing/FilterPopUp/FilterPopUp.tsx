import * as React from 'react';
import '../../_styles/common.scss';
import PopUp from '../../common/PopUp';
import { FormControlLabel, Checkbox, TextField, Button, Slider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SectionBox from '../../common/SectionBox';
import * as ProjectActions from '../../../redux/actions/projectActions';
import { getVariables } from '../../../redux/reducers/projectReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Variable } from '../../_types/DataTable';
import { isActiveClassName } from '../../../utils/stylingHelpers';
import { METRICS } from '../../../styles/styles';
import { FilterPopUpUseStyles } from '../../../styles/materialUIoverrides';
import { ToggleGroupSectionBoxTitleProps, FILTER_TYPES, FilterPopUpProps, FilterTypes } from '../../_types/PreProcessing';
import VariableSelectableChipList from './ChipListContainer';
import { Filter, FILTER_CRITERIAS } from '../../../containers/_types/Project.types';

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
    addNewFilter,
}) => {
    const [filterName, setFilterName] = React.useState<string>('');
    const [selectedVariable, setSelectedVariable] = React.useState<Variable | null>();
    const [selectedType, setselectedType] = React.useState<FilterTypes>(FILTER_TYPES.RANGES);
    const [rangesValues, setRangesValues] = React.useState<[number, number]>([0, 100]);
    const [includeBorders, setIncludeBorders] = React.useState<boolean>(false);
    const [createAnother, setCreateAnother] = React.useState<boolean>(false);
    const [valuesList, setValuesList] = React.useState<{ inculde: string[], exclude: string[]}>({ inculde: [], exclude: [] });

    const classes = FilterPopUpUseStyles();
    const hasValidRange = checkValidRange(selectedVariable);

    const createFilter = () => {
        if (!selectedVariable) {
            alert('No selected variable!');
            return;
        }
        if (!filterName) {
            alert('No filter name provided!');
            return;
        }

        const filterBaseData = {
            name: filterName,
            variable: selectedVariable,
        };

        if (hasValidRange) {
            if (rangesValues[0] !== selectedVariable.min) {
                addNewFilter(new Filter({
                    ...filterBaseData,
                    type: 'range',
                    criteriaRange: rangesValues[0],
                    criteria: includeBorders ? FILTER_CRITERIAS.GREATER_EQUAL : FILTER_CRITERIAS.GREATER,
                }));
            }
            if (rangesValues[1] !== selectedVariable.max) {
                addNewFilter(new Filter({
                    ...filterBaseData,
                    type: 'range',
                    criteriaRange: rangesValues[1],
                    criteria: includeBorders ? FILTER_CRITERIAS.LESS_EQUAL : FILTER_CRITERIAS.LESS,
                }));
            }
        }
        if (valuesList.inculde.length) {
            addNewFilter(new Filter({
                ...filterBaseData,
                type: 'values',
                criteria: FILTER_CRITERIAS.INCLUDE,
                criteriaValues: valuesList.inculde,
            }));
        }
        if (valuesList.exclude.length) {
            addNewFilter(new Filter({
                ...filterBaseData,
                type: 'values',
                criteria: FILTER_CRITERIAS.EXCLUDE,
                criteriaValues: valuesList.exclude,
            }));
        }

        if (!createAnother) {
            onClose();
        } else {
            setFilterName('');
            setSelectedVariable(undefined);
            setValuesList({ inculde: [], exclude: [] });
        }
    }

    const handleChange = (event: any, newValue: number | number[]) => {
        setRangesValues(newValue as [number, number]);
    };

    const onAutoCompleteSelected = (e, variable: Variable | null) => {
        console.log({ e });
        setSelectedVariable(variable);
        if (checkValidRange(variable) && variable?.min) {
            setRangesValues([variable?.min, variable?.max]);
        }
    }

    return (
        <PopUp
            title="NEW FILTER"
            onClose={onClose}
            onApprove={createFilter}
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
                        {hasValidRange ? (
                            <>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={includeBorders}
                                            onChange={() => setIncludeBorders(!includeBorders)}
                                        />
                                    }
                                    label="Include borders"
                                    style={{ marginBottom: METRICS.big_spacing }}
                                />
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
                            </>
                        ) : (
                            <p>Can't create value range restriction for the selected variable!</p>
                        )}
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <VariableSelectableChipList
                                onChange={(inc) => setValuesList({ ...valuesList, inculde: inc })}
                                type="INCLUDE"
                            />
                            <VariableSelectableChipList
                                onChange={(exc) => setValuesList({ ...valuesList, exclude: exc })}
                                type="EXCLUDE"
                            />
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
    addNewFilter: bindActionCreators(ProjectActions.addNewFilter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopUp);
