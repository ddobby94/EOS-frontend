import React from 'react';
import { Icon, Fab, Button } from '@material-ui/core';
import { ContentCard } from '../components/common/ContentCard';
import { ProgressBar } from '../components/ProgressBar';
import './styles/project.scss';

const PROGRESS_BAR_ELEMENTS = ['Import', 'Exploratory Analysis', 'Bivariate Analysis', 'pre-processing', 'Model development'];

const ProjectHeader = ({ projectTitle }) => (
    <div className="project-headerContainer">
        <h2 className="project-logo">EOS</h2>
        <h2>{projectTitle}</h2>
        <Fab className="project-closeButton" size="medium" aria-label="add">
            <Icon
                className="fa fa-times"
            />
        </Fab>
    </div>
);

export const ProjectContainer = () => {
    return (
        <div>
            <ProjectHeader
                projectTitle="MY project title :)"
            />

            <ContentCard
                title="PREVIOUS PROJECTS"
            >
                <div>
                    <p>heyyy</p>
                </div>
            </ContentCard>
            <div className="project-footerContainer">
                <Button
                    className="project-previoustButton"
                    variant="contained"
                >PREVIOUS</Button>
                <div className="project-progressBar">
                    <ProgressBar
                    items={PROGRESS_BAR_ELEMENTS}
                    active={1}
                    onChange={console.log}
                    />
                </div>

                <Button
                    color="primary"
                    variant="contained"
                >NEXT</Button>

            </div>
        </div>
    );
};

export default ProjectContainer;
