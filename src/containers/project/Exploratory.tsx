import React from 'react';
import { ExpolratoryProps } from '../_types/Project.types';
import ContentCard from '../../components/common/ContentCard';
import EnhancedTable from '../../components/DataTable/DataTable';
import { getTargetVariable } from '../../redux/reducers/projectReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../../redux/actions/projectActions';


export const Exploratory: React.FunctionComponent<ExpolratoryProps> = ({
    setNextButtonAvailability,
    targetVariable,
    setTargetVariable,
}) => {

    React.useEffect(() => {
        setNextButtonAvailability(!!targetVariable);
    }, [targetVariable])

    return (
        <ContentCard
            title="EXPLORATORY ANALYSIS"
        >
            <EnhancedTable
                setTargetVariable={setTargetVariable}
            />
        </ContentCard>
    );
};

const mapStateToProps = (state) => ({
    targetVariable: getTargetVariable(state),
});

const mapDispatchToProps = (dispatch) => ({
    setTargetVariable: bindActionCreators(ProjectActions.setTargetVariable, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exploratory);
