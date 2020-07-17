import React from 'react';
import { PreProcessingProps, Filter } from '../_types/Project.types';
import ContentCard from '../../components/common/ContentCard';
import SectionBox from '../../components/common/SectionBox';
import { getProjectBaseData, getFilters } from '../../redux/reducers/projectReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../../redux/actions/projectActions';

import { Fab, Icon } from '@material-ui/core';
import SimpleTableComponent from '../../components/common/SimpleTableComponent';
import { PieChart } from '../../components/common/PieChart';

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

const SAMPLE_FILTERS = [
    {
        isActive: false,
        id: 'foo',
        values: {
            name: 'name',
            variable: 'variable',
            criteria: 'criteria',
            criteriaVal: 'criteriaVal',
        }
    },
    {
        isActive: false,
        id: 'foo2',
        values: {
            name: 'myName',
            variable: 'asdasd',
            criteria: 'aaaaa',
            criteriaVal: 'ddddd',
        }
    },
    {
        isActive: false,
        id: 'foo3',
        values: {
            name: 'name4',
            variable: 'eeeee',
            criteria: 'b',
            criteriaVal: 'c',
        }
    },
];

console.log(SAMPLE_FILTERS)

const convertFilters = ({ id, name, isActive, variable, criteria, criteriaValues }: Filter) => ({
    id,
    isActive,
    values: {
        name,
        variable,
        criteria,
        criteriaValues: criteriaValues?.join(', '),
    }
});


export const PreProcessing: React.FunctionComponent<PreProcessingProps> = ({
    setNextButtonAvailability,
    projectBaseData,
    toggleFilterIsActive,
    filters,
}) => {
    const [showFilter, setShowFilter] = React.useState<boolean>(false);
    console.log(setNextButtonAvailability);

    // React.useEffect(() => {
    //     setNextButtonAvailability(!!targetVariable);
    // }, [targetVariable])

    return (
        <ContentCard
            title="PRE-PROCESSING"
        >
            <div className="preProcessing-container" >
                <div className="preProcessing-colContainer" >
                    <SectionBox
                        title="BASE DATA"
                    >
                        <div className="baseData-container">
                            <div className="baseData-list">
                                <ul>
                                    <li>Target: {projectBaseData.targetVariable?.name}</li>
                                </ul>
                            </div>
                            <div className="baseData-chart">
                                <PieChart
                                    values={[11, 88]}
                                    labels={['First', 'sec']}
                                    title="CHart titTle"
                                />
                            </div>
                        </div>
                    </SectionBox>
                    <SectionBox
                        title="MODELING SAMPLE"
                    >
                        SAMPLE
                    </SectionBox>
                </div>
                <div className="preProcessing-colContainer" >
                    <SectionBox
                        title="APPLY FILTERS"
                        style={{ padding: 0 }}
                        titleStyle={{ top: '-12px', left: '16px' }}
                    >
                        <SimpleTableComponent
                            data={filters.map(convertFilters)}
                            titleArray={SAMPLE_FILTER_HEADERS}
                            onSetActive={toggleFilterIsActive}
                        />
                        <Fab
                            color="primary"
                            aria-label="add"
                            size="medium"
                        >
                            <Icon
                                className="fa fa-plus"
                                onClick={() => setShowFilter(!showFilter)}
                            />
                        </Fab>
                    </SectionBox>
                    <SectionBox
                        title="IV RESULTS"
                    >
                        RESULTS
                    </SectionBox>
                </div>
            </div>
        </ContentCard>
    );
};

const mapStateToProps = (state) => ({
    projectBaseData: getProjectBaseData(state),
    filters: getFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
    setTargetVariable: bindActionCreators(ProjectActions.setTargetVariable, dispatch),
    toggleFilterIsActive: bindActionCreators(ProjectActions.toggleFilter, dispatch),
    addFilter: bindActionCreators(ProjectActions.addNewFilter, dispatch),
    removeFilter: bindActionCreators(ProjectActions.removeFilter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreProcessing);
