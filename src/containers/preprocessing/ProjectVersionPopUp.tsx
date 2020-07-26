import * as React from 'react';
import '../../components/_styles/common.scss';
import PopUp from '../../components/common/PopUp';
import * as ProjectActions from '../../redux/actions/projectActions';
import { getVariables, getProjectCurrentVersion } from '../../redux/reducers/projectReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProjectVersionPopUpProps } from '../../components/_types/PreProcessing';
import Chip from '../../components/common/Chip';
import { COLORS, METRICS } from '../../styles/styles';
import SimpleTableComponent from '../../components/common/SimpleTableComponent';
import { Redirect } from 'react-router-dom';

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
];

const SAMPLE_DATA = [
    {
        id: 'a0',
        values: {
            version: 1,
            target: 'UNPRODUCTIVE',
            activeFilters: 'REFFSO_GREATER, DISCO_REASON_EXCLUDING',
            meta0: 12,
            meta1: 20,
            holdout: 0.3,
            ivBins: 33,
        }
    },
    {
        id: 'a1',
        values: {
            version: 2,
            target: 'UNPRODUCTIVE',
            activeFilters: 'DISCO_REASON_EXCLUDING',
            meta0: 12,
            meta1: 20,
            holdout: 0.11,
            ivBins: 33,
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
        }
    },
]

export const ProjectVersionPopUp: React.FunctionComponent<ProjectVersionPopUpProps> = ({
    onClose,
    openSelectedDatasetAtVersion,
    currentVersion,
    title,
}) => {
    const [redirect, setRedirect] = React.useState<boolean>(false);
    const [loadStarted, setloadStarted] = React.useState<boolean>(false);

    const onLoad = (id: string) => {
        setloadStarted(true);
        openSelectedDatasetAtVersion(id);
    }
    const redirectToProjectView = () => {
        if (loadStarted) {
            setRedirect(loadStarted);
            setloadStarted(false);
        }
    }

    React.useEffect(() => {
        redirectToProjectView();
    }, [currentVersion]);

    if (redirect) {
        return (
            <Redirect
                to={'/newproject?step=2'}
            />
        );
    }

    return (
        <PopUp
            title={title}
            description="Review the versions"
            onClose={onClose}
        >
            <div style={{ display: 'flex', margin: `${METRICS.medium_spacing} 0 ${METRICS.small_spacing}` }}>
                <Chip
                    title="#VARIABLES"
                    description="39"
                    color={COLORS.ocean}
                />
                <Chip
                    title="#Records"
                    description="42 412"
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
                emphasizedRowButton={{ title: 'OPEN', onClick: onLoad }}
            />
                    {/* rowActions={[
                        {
                            title: 'heyyyy',
                            onClick: console.log,
                        }
                    ]} */}
        </PopUp>
    );
}


const mapStateToProps = (s) => ({
    variables: getVariables(s),
    currentVersion: getProjectCurrentVersion(s),
});

const mapDispatchToProps = (dispatch) => ({
    addNewFilter: bindActionCreators(ProjectActions.addNewFilter, dispatch),
    openSelectedDatasetAtVersion: bindActionCreators(ProjectActions.openSelectedDatasetAtVersion, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVersionPopUp);
