import React from 'react';
import { PreProcessingProps, Filter } from '../_types/Project.types';
import ContentCard from '../../components/common/ContentCard';
import SectionBox from '../../components/common/SectionBox';
import {
    getProjectBaseData,
    getFilters,
    getVariables,
    getActiveFiltersList,
    getTargetVariable,
    hasVariablesWithFineIV,
} from '../../redux/reducers/projectReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../../redux/actions/projectActions';
import { Fab, Icon, TextField, Button, Chip } from '@material-ui/core';
import SimpleTableComponent from '../../components/common/SimpleTableComponent';
import { PieChart } from '../../components/common/PieChart';
import FilterPopUp from '../preprocessing/FilterPopUp';
import '../_styles/project.scss';
import { Variable } from '../../components/_types/DataTable';
import { METRICS } from '../../styles/styles';
import EmptyState from '../../components/common/EmptyState';
import ProjectVersionPopUp from '../preprocessing/ProjectVersionPopUp';

const SAMPLE_FILTER_HEADERS = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'variable',
        label: 'Variable',
    },
    {
        key: 'criteria',
        label: 'Criteria',
    },
    {
        key: 'criteriaValues',
        label: 'Cirtieria value',
    },
];

const IV_RESULTS_HEADERS = [
    {
        key: 'name',
        label: 'Variable',
    },
    {
        key: 'role',
        label: 'ROle',
    },
    {
        key: 'type',
        label: 'Type',
    },
    {
        key: 'IVvalue',
        label: 'fine IV',
    },
];


const convertFilters = ({ id, name, isActive, variable, criteria, criteriaValues, criteriaRange }: Filter) => ({
    id,
    isActive,
    values: {
        name,
        variable: variable.name,
        criteria,
        criteriaValues: criteriaRange || criteriaValues?.join(', '),
    }
});


const BaseData = ({ projectBaseData }) => (
    <SectionBox
        title="BASE DATA"
    >
        <div className="baseData-container">
            <div className="baseData-list">
                <ul>
                    <li><strong>Target: </strong>{projectBaseData.targetVariable?.name}</li>
                    <li><strong>Total records: </strong>{projectBaseData.totalRecords || 'N/A'}</li>
                    <li><strong>Number of variables: </strong>{projectBaseData.numberOfVariables || 'N/A'}</li>
                    <li><strong>Dataset name: </strong>{projectBaseData.datasetName || 'N/A'}</li>
                    {projectBaseData.currentVersion !== -1 && (<li><strong>Current version: </strong>{projectBaseData.currentVersion}</li>)}
                </ul>
            </div>
            <div className="baseData-chart">
                <PieChart
                    values={[11, 88]}
                    labels={['0', '1']}
                    title="Target Variable Distribution"
                />
            </div>
        </div>
    </SectionBox>
);

const ModelingSample = ({ onGenerate, activeFiltersList, setShowProjectVersionPopUps }) => {
    const [meta0, setMeta0] = React.useState<number>(10);
    const [meta1, setMeta1] = React.useState<number>(15);
    const [metaHoldout, setMetaHoldout] = React.useState<number>(0.2);
    const [metaBins, setMetaBins] = React.useState<number>(20);

    // React.useEffect(() => {
    //     setNextButtonAvailability(!!targetVariable);
    // }, [targetVariable])

    const generate = () => {
        const IVmeta = {
            '0': meta0,
            '1': meta1,
            holdout: metaHoldout,
            IVbins: metaBins,
        };

        onGenerate(IVmeta);
    }

    return (
        <SectionBox
            title="MODELING SAMPLE"
        >
            <h4>Set metadata</h4>
            <div className="modelingSample-inputContainer">
                <TextField
                    className="login-input"
                    label="0"
                    variant="outlined"
                    value={meta0}
                    onChange={(e) => setMeta0(Number(e.target.value) || meta0)}
                />
                <TextField
                    className="login-input"
                    label="1"
                    variant="outlined"
                    value={meta1}
                    onChange={(e) => setMeta1(Number(e.target.value) || meta1)}
                />
                <TextField
                    className="login-input"
                    label="Holdout"
                    variant="outlined"
                    value={metaHoldout}
                    onChange={(e) => setMetaHoldout(Number(e.target.value) || metaHoldout)}
                />
                <TextField
                    className="login-input"
                    label="IV Bins"
                    variant="outlined"
                    value={metaBins}
                    onChange={(e) => setMetaBins(Number(e.target.value) || metaBins)}
                />
            </div>
            {!!activeFiltersList.length && (
                <>
                    <h4>Active Filters</h4>
                    <div className="modelingSample-inputContainer">
                        {activeFiltersList.map((v, i) => (
                            <Chip
                                className="chipListInput-chip"
                                key={`${v.id}-${i}`}
                                label={v.name}
                                color="primary"
                            />
                        ))}
                    </div>
                </>
            )}
            <div
                style={{
                    marginTop: METRICS.big_spacing,
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    onClick={() => setShowProjectVersionPopUps(true)}
                    color="secondary"
                    variant="contained"
                    children="LOAD PREVIOUS VERSION"
                    />
                <Button
                    style={{
                        marginLeft: METRICS.big_spacing,
                    }}
                    onClick={generate}
                    color="primary"
                    variant="contained"
                    children="GENERATE SAMPLE"
                />
            </div>

        </SectionBox>
    );
};

const FilterTable = ({ filters, toggleFilterIsActive, variables }) => {
    const [showFilter, setShowFilter] = React.useState<boolean>(false);

    return (
        <SectionBox
            title="APPLY FILTERS"
            style={{ padding: 0, display: 'flex', flexDirection: 'column' }}
            titleStyle={{ left: METRICS.small_spacing, width: 'fit-content' }}
        >
            {filters.length ? (
                <SimpleTableComponent
                    data={filters.map(convertFilters)}
                    titleArray={SAMPLE_FILTER_HEADERS}
                    onSetActive={toggleFilterIsActive}
                />
            ) : (
                <EmptyState
                    size="small"
                    title="No filters"
                    icon="fa-filter"
                />
            )}
            <Fab
                color="primary"
                aria-label="add"
                size="small"
                style={{ alignSelf: 'flex-end', margin: METRICS.smallest_spacing }}
            >
                <Icon
                    className="fa fa-plus"
                    onClick={() => setShowFilter(!showFilter)}
                />
            </Fab>
            {showFilter && <FilterPopUp
                onClose={() => setShowFilter(!showFilter)}
                variables={variables}
            />}
        </SectionBox>
    )
};


const convertVariables = ({ name, role, type, IVvalue }: Variable) => ({
    id: name,
    values: {
        name,
        role,
        type,
        IVvalue,
    }
});

const IVresultsTable = ({ hasGeneratedFineIV, variables }) => (
    <SectionBox
        title="IV RESULTS"
        style={{ padding: `${METRICS.smallest_spacing} 0 ` }}
        titleStyle={{ left: METRICS.small_spacing }}
    >
        {hasGeneratedFineIV ? (
            <SimpleTableComponent
                data={variables.filter(({ IVvalue }) => IVvalue !== undefined).map(convertVariables)}
                titleArray={IV_RESULTS_HEADERS}
            />
        ) : (
            <EmptyState
                size="small"
                title="No IV generated"
                icon="fa-table"
                description={'Press "GENERATE SAMPLE" to calculate the IV results'}
            />
        )}
    </SectionBox>
);


export const PreProcessing: React.FunctionComponent<PreProcessingProps> = ({
    setNextButtonAvailability,
    toggleFilterIsActive,
    projectBaseData,
    filters,
    variables,
    activeFiltersList,
    generateIVsample,
    targetVariable,
    hasGeneratedFineIV,
}) => {
    const [showProjectVersionPopUps, setShowProjectVersionPopUps] = React.useState<boolean>(false);
    console.log({showProjectVersionPopUps})
    const generate = (IVmeta) => {
        if (targetVariable) {
            generateIVsample([ activeFiltersList, IVmeta, targetVariable])
        }
    }

    return (
        <ContentCard
            title="PRE-PROCESSING"
        >
            <div className="preProcessing-container" >
                <div className="preProcessing-colContainer" >
                    <BaseData projectBaseData={projectBaseData} />
                    <ModelingSample
                        onGenerate={generate}
                        activeFiltersList={activeFiltersList}
                        setShowProjectVersionPopUps={setShowProjectVersionPopUps}
                    />
                </div>
                <div className="preProcessing-colContainer" >
                    <FilterTable
                        variables={variables}
                        filters={filters}
                        toggleFilterIsActive={toggleFilterIsActive}
                    />
                    <IVresultsTable
                        hasGeneratedFineIV={hasGeneratedFineIV}
                        variables={variables}
                    />
                </div>
            </div>
            {showProjectVersionPopUps && (
                <ProjectVersionPopUp
                    title="My first project"
                    onClose={() => setShowProjectVersionPopUps(false)}
                />
            )}
        </ContentCard>
    );
};

const mapStateToProps = (state) => ({
    projectBaseData: getProjectBaseData(state),
    variables: getVariables(state),
    targetVariable: getTargetVariable(state),
    filters: getFilters(state),
    activeFiltersList: getActiveFiltersList(state),
    hasGeneratedFineIV: hasVariablesWithFineIV(state),
});

const mapDispatchToProps = (dispatch) => ({
    setTargetVariable: bindActionCreators(ProjectActions.setTargetVariable, dispatch),
    toggleFilterIsActive: bindActionCreators(ProjectActions.toggleFilter, dispatch),
    addFilter: bindActionCreators(ProjectActions.addNewFilter, dispatch),
    removeFilter: bindActionCreators(ProjectActions.removeFilter, dispatch),
    generateIVsample: bindActionCreators(ProjectActions.generateIVsample, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreProcessing);
