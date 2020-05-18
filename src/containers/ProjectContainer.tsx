import React from 'react';
import { Icon, Button } from '@material-ui/core';
import { ContentCard } from '../components/common/ContentCard';
import { ProgressBar } from '../components/ProgressBar';

const PROGRESS_BAR_ELEMENTS = ['Import', 'Exploratory Analysis', 'Bivariate Analysis', 'pre-processing', 'Model development'];

const ProjectHeader = ({ projectTitle }) => (
    <div className="project-headerContainer">
        <h2>EOS</h2>
        <h2>{projectTitle}</h2>
        <Icon
            className="fa fa-times"
        />
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
                <Button>PREVIOUS</Button>
                <ProgressBar
                    items={PROGRESS_BAR_ELEMENTS}
                    active={1}
                    onChange={console.log}
                />
                <Button>NEXT</Button>
            </div>
        </div>
    );
};

export default ProjectContainer;
