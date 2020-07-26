import * as React from 'react';
import EmptyState from './common/EmptyState';
import './_styles/common.scss';
import SimpleTableComponent from './common/SimpleTableComponent';

interface PreviousProjectsProperties {
    projects: any[];
    openVersionPopUp: (id: string) => void;
}


const HEADERS = [
    {
        label: 'Name',
        key: 'name',
    },
    {
        label: 'Created',
        key: 'created',
    },
    {
        label: 'Target',
        key: 'target',
    },
];

const SAMPLE_DATA = [
    {
        id: 'a0',
        values: {
            name: 'My first project',
            created: '27/07/2020',
            target: 'UNIPRODUCTIVE',
        }
    }
]

export const PreviousProjects: React.FunctionComponent<PreviousProjectsProperties> = ({ projects, openVersionPopUp }) => {
    if (!projects.length && !!0) {
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
            <SimpleTableComponent
                data={SAMPLE_DATA}
                titleArray={HEADERS}
                emphasizedRowButton={{ title: 'DETAILS', onClick: (id) => openVersionPopUp(id) }}
            />
        </div>
    );
};

export default PreviousProjects;
