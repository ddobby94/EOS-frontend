import * as React from 'react';
import { Icon } from '@material-ui/core';
import '../_styles/common.scss';

interface EmptyStateProperties {
    icon: string;
    description: string;
}

export const EmptyState: React.FunctionComponent<EmptyStateProperties> = ({ icon, description }) => {

    return (
        <div>
            <Icon
                className={`fa ${icon}`}
            />
            <strong>{description}</strong>
        </div>
    );
}

export default EmptyState;
