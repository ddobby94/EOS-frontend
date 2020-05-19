import React, { useState } from 'react';
import { ProjectFooter } from '../../components/project/ProjectFooter';
import { ProjectHeader } from '../../components/project/ProjectHeader';
import '../_styles/project.scss';
import Import from './Import';
import { getProjectTitle } from '../../redux/reducers/projectReducer';
import { connect } from 'react-redux';
import { ContentCard } from '../../components/common/ContentCard';
import { Redirect } from 'react-router-dom';
import Exploratory from './Exploratory';
import { bindActionCreators } from 'redux';
import { setProjectTitle } from '../../redux/actions/projectActions';

const PAGE_INDEXES = {
    IMPORT: 0,
    EPLORATORY: 1,
    BIVARIATE: 2,
    PRE_PROCESSING: 3,
    MODEL_DEVELOPMENT: 4,
};

interface ProjectContainerProps {
    projectTitleRedux: string;
    setProjectTitleRedux: (string) => void;
}

export const ProjectContainer: React.FunctionComponent<ProjectContainerProps> = ({ projectTitleRedux, setProjectTitleRedux }) => {
    const [activePage, setActivePage] = useState<number>(0);
    const [disableNext, setDisableNext] = useState<boolean>(true);
    const [redirect, setRedirect] = useState<string>();
    const [projectName, setProjectName] = useState<string>(projectTitleRedux);

    const getActiveContent = () => {
        switch(activePage) {
            case PAGE_INDEXES.IMPORT:
                return (
                    <Import
                        setNextButtonAvailability={setDisableNext}
                        onProjectNameChange={setProjectName}
                        projectTitle={projectName}
                    />
                );
            case PAGE_INDEXES.EPLORATORY:
                return (<Exploratory setNextButtonAvailability={setDisableNext} />);
            default:
                return (<ContentCard title="in progress"> IN PROGRESS </ContentCard>);
        }
    }

    const updateStoreProjectName = () => {
        if (activePage === PAGE_INDEXES.IMPORT) {
            setProjectTitleRedux(projectName);
        }
    }

    const goToNext = () => {
        setDisableNext(true);
        updateStoreProjectName();
        setActivePage(activePage + 1);
    }

    const goToPrevious = () => {
        setActivePage(activePage - 1);
    }

    const onClose = () => {
        setRedirect('dashboard');
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
                {getActiveContent()}
            <ProjectFooter
                activePage={activePage}
                onNext={goToNext}
                onPrevious={goToPrevious}
                onGoToPage={console.log}
                disableNext={disableNext}
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
