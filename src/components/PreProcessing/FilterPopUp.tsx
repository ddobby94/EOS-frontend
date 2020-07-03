import * as React from 'react';
import '../_styles/common.scss';
import PopUp, { PopUpProperties } from '../common/PopUp';
import { FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core';
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

    const onCreate = () => {
        console.log('TODO: filterName, rangeOrValue, selectedVariable, includeBorders, min, max, valuesToInclude, valuesToExclude ');
    }

    console.log({ variables });

    // SLIDER min-max: https://material-ui.com/components/slider/#range-slider
    // TODO need to import from material-ui
    // Checkbox https://material-ui.com/components/checkboxes/
    //

    return (
        <PopUp
            title="PRE-PROCESSING FILTER"
            description="Lorem ipsum dolor sit amet!"
            onClose={onClose}
            onApprove={onCreate}
            positiveButtonText="CREATE"
            secondaryButtonComponent={(
                <FormControlLabel
                    control={<Checkbox checked={false} onChange={console.log} />}
                    label="create another"
                />
            )}
        >
            <SectionBox
                title="Base data"
            >
                <TextField
                    className="login-input"
                    id="outlined-basic"
                    label="Filter Name"
                    variant="outlined"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
                <Autocomplete
                    id="combo-box-demo"
                    options={variables}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select a variable"
                            variant="outlined"
                        />
                    )}
                />
            </SectionBox>
            <SectionBox
                title=""
                titleComponent={
                    <div
                        className="togglegroup"
                    >
                        <Button
                            onClick={() => setselectedType('ranges')}
                            children="Set ranges"
                        />
                        <Button
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
                </>
            ) : (
                <>
                    <h1>Selected values</h1>
                    <p>yep its working fine</p>
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
