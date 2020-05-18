import * as React from 'react';
import EmptyState from './common/EmptyState';
import './_styles/common.scss';

interface PreviousProjectsProperties {
    projects: any[];
}

export const PreviousProjects: React.FunctionComponent<PreviousProjectsProperties> = ({ projects }) => {

    if (!projects.length) {
        return (
            <div className="empty-page">
                <EmptyState
                    icon="fa-list empty-icon"
                    title="No previous projects"
                    description="Add a project using the NEW PROJECT button in the sidebar"
                />
            </div>
        );
    }

    return (
        <div>
            <p>{projects[0]}</p>
            <h1>This is my React component!!!</h1>
        </div>
    );
};

export default PreviousProjects;
