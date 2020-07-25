import * as React from 'react';
import { Icon } from '@material-ui/core';
import '../_styles/common.scss';

interface EmptyStateProperties {
    icon: string;
    title: string;
    description?: string;
    size?: 'small' | 'default' | 'large';
}

const ICON_CONTAINER_DIMENSIONS = {
    small: '100px',
    default: '250px',
    large: '400px',
}

export const EmptyState: React.FunctionComponent<EmptyStateProperties> = ({ icon, title, description, size = 'default' }) => {

    return (
        <div className="empty-container">
            <div
                className="empty-iconContainer"
                style={{
                    width: ICON_CONTAINER_DIMENSIONS[size],
                    height: ICON_CONTAINER_DIMENSIONS[size],
                }}
            >
            <Icon
                className={`fa ${icon}`}
                fontSize={size}
            />
            </div>

            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default EmptyState;
