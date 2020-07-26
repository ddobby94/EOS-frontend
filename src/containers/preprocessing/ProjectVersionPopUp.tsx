import * as React from 'react';
import '../../components/_styles/common.scss';
import PopUp from '../../components/common/PopUp';
import * as ProjectActions from '../../redux/actions/projectActions';
import { getVariables } from '../../redux/reducers/projectReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProjectVersionPopUpProps } from '../../components/_types/PreProcessing';
import Chip from '../../components/common/Chip';
import { COLORS } from '../../styles/styles';
import SimpleTableComponent from '../../components/common/SimpleTableComponent';

const HEADERS = [
    {
        label: 'Version',
        key: 'version',
    },
    {
        label: 'Target',
        key: 'target',
    },
    {
        label: 'Filters',
        key: 'activeFilters',
    },
    {
        label: '0',
        key: 'meta0',
    },
    {
        label: '1',
        key: 'meta1',
    },
    {
        label: 'Holdout',
        key: 'holdout',
    },
    {
        label: 'IV bins',
        key: 'ivBins',
    },
    {
        label: 'Created At',
        key: 'created',
    },
];

const SAMPLE_DATA = [
    {
        id: 'a0',
        values: {
            version: 1,
            target: 'UNPRODUCTIVE',
            activeFilters: 'REFFSO_GREATER, DISCO_REASON_EXCLUDING, REFFSO_GREATER, DISCO_REASON_EXCLUDING, REFFSO_GREATER, DISCO_REASON_EXCLUDING',
            meta0: 12,
            meta1: 20,
            holdout: 0.3,
            ivBins: 33,
            created: '07/07/2020',
        }
    },
    {
        id: 'a1',
        values: {
            version: 2,
            target: 'UNPRODUCTIVEASCWRASD',
            activeFilters: 'DISCO_REASON_EXCLUDING',
            meta0: 12,
            meta1: 20,
            holdout: 0.11,
            ivBins: 33,
            created: '08/07/2020',
        }
    },
    {
        id: 'a3',
        values: {
            version: 3,
            target: 'UNPRODUCTIVE',
            activeFilters: 'REFFSO_GREATER',
            meta0: 10,
            meta1: 22,
            holdout: 0.2,
            ivBins: 22,
            created: '09/07/2020',
        }
    },
]

export const ProjectVersionPopUp: React.FunctionComponent<ProjectVersionPopUpProps> = ({
    onClose,
}) => {

    return (
        <PopUp
            title="NEW FILTER"
            description="Review the versions"
            onClose={onClose}
            onApprove={console.log}
            positiveButtonText="CREATE"
        >
            <div style={{ display: 'flex' }}>
                <Chip
                    title="#VARIABLES"
                    description="39"
                    color={COLORS.ocean}
                />
                <Chip
                    title="#Records"
                    description="427,020"
                    color={COLORS.orange}
                />
                <Chip
                    title="DATASET NAME"
                    description="custom dataset name"
                    color={COLORS.sky_blue}
                />
            </div>
            <SimpleTableComponent
                data={SAMPLE_DATA}
                titleArray={HEADERS}
                emphasizedRowButton={{ title: 'OPEN', onClick: console.log }}
                rowActions={[
                    {
                        title: 'heyyyy',
                        onClick: console.log,
                    }
                ]}
            />

        </PopUp>
    );
}


const mapStateToProps = (s) => ({
    variables: getVariables(s),
});

const mapDispatchToProps = (dispatch) => ({
    addNewFilter: bindActionCreators(ProjectActions.addNewFilter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVersionPopUp);
