import * as React from 'react';
import { Icon } from '@material-ui/core';
import '../_styles/common.scss';

interface EmptyStateProperties {
    icon: string;
    title: string;
    description?: string;
}

export const EmptyState: React.FunctionComponent<EmptyStateProperties> = ({ icon, title, description }) => {

    return (
        <div className="empty-container">
            <div className="empty-iconContainer">
            <Icon
                className={`fa ${icon}`}
            />
            </div>

            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default EmptyState;
