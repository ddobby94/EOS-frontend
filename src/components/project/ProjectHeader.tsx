import React from 'react';
import { Icon, Fab } from '@material-ui/core';

interface ProjectHeaderProps {
    projectTitle: string;
    onClose: () => void;
}

export const ProjectHeader: React.FunctionComponent<ProjectHeaderProps> = ({ projectTitle, onClose }) => (
    <div className="project-headerContainer">
        <h2 className="project-logo">DOBBY</h2>
        <h2 className="project-name">{projectTitle}</h2>
        <Fab
            className="project-closeButton"
            size="medium"
            aria-label="close"
            onClick={onClose}
        >
            <Icon
                className="fa fa-times"
            />
        </Fab>
    </div>
);

export default ProjectHeader;
