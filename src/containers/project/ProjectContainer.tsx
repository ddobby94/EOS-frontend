import React, { useState, useEffect } from 'react';
import { ProjectFooter } from '../../components/project/ProjectFooter';
import { ProjectHeader } from '../../components/project/ProjectHeader';
import '../_styles/project.scss';
import ImportDataSet from './ImportDataSet';
import { getProjectTitle } from '../../redux/reducers/projectReducer';
import { connect } from 'react-redux';
import { ContentCard } from '../../components/common/ContentCard';
import { Redirect } from 'react-router-dom';
import Exploratory from './Exploratory';
import { bindActionCreators } from 'redux';
import { setProjectTitle } from '../../redux/actions/projectActions';
import { useDelayedUnmounting, MOUNTING_STATES } from '../../utils';
import { setSuffixClassName } from '../../utils/stylingHelpers';
import { ProjectContainerProps } from '../_types/Project.types';

const PAGE_INDEXES = {
    IMPORT: 0,
    EPLORATORY: 1,
    PRE_PROCESSING: 2,
    MODEL_DEVELOPMENT: 3,
};

const InOutAnimationHandler = ({ mountingState, children }) => (
    <div className={setSuffixClassName(true, 'animations' ,`-${mountingState}`)}>
        {children}
    </div>
);

export const ProjectContainer: React.FunctionComponent<ProjectContainerProps> = ({
    projectTitleRedux,
    setProjectTitleRedux,
}) => {
    const [activePage, setActivePage] = useState<number>(0);
    const [nextPage, setnextPage] = useState<number>(0);
    const [enableNext, setEnableNext] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<string>();
    const [projectName, setProjectName] = useState<string>(projectTitleRedux);
    const [mountingState, startMounting, startUnMounting] = useDelayedUnmounting(800);

    useEffect(() => {
        if (mountingState === MOUNTING_STATES.UNMOUNTED) {
            const isPrev = activePage > nextPage;
            startMounting(!isPrev);
            setActivePage(nextPage);
        }
    }, [mountingState]);

    const getActiveContent = () => {
        switch(activePage) {
            case PAGE_INDEXES.IMPORT:
                return (
                    <ImportDataSet
                        setNextButtonAvailability={setEnableNext}
                        onProjectNameChange={setProjectName}
                        projectTitle={projectName}
                    />
                );
            case PAGE_INDEXES.EPLORATORY:
                return (
                    <Exploratory setNextButtonAvailability={setEnableNext} />
                );
            case PAGE_INDEXES.PRE_PROCESSING:
                return (
                    <ContentCard title="PRE PROCESSING"> PRE PROCESSING </ContentCard>
                );
            default:
                return (
                    <ContentCard title="in progress"> IN PROGRESS </ContentCard>
                );
        }
    }

    const updateStoreProjectName = () => {
        if (activePage === PAGE_INDEXES.IMPORT) {
            setProjectTitleRedux(projectName);
        }
    }

    const goToNext = () => {
        setEnableNext(false);
        updateStoreProjectName();
        startUnMounting();
        setnextPage(activePage + 1);
    }

    const goToPrevious = () => {
        startUnMounting(false)
        setnextPage(activePage - 1);
    }

    const onClose = () => {
        setRedirect('/');
    }

    if (redirect) {
        return (
            <Redirect
                to={redirect}
            />
        );
    }

    return (
        <div>
            <ProjectHeader
                projectTitle={projectName}
                onClose={onClose}
            />
                <InOutAnimationHandler
                    mountingState={mountingState}
                >
                    {getActiveContent()}
                </InOutAnimationHandler>
            <ProjectFooter
                activePage={activePage}
                onNext={goToNext}
                onPrevious={goToPrevious}
                onGoToPage={console.log}
                disableNext={!enableNext}
            />
        </div>
    );
};


const mapStateToProps = (state) => ({
    projectTitleRedux: getProjectTitle(state),
})

const mapDispatchToProps = (dispatch) => ({
    setProjectTitleRedux: bindActionCreators(setProjectTitle, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
