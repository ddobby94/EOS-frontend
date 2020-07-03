import React from 'react';
import { COLORS, METRICS } from '../../styles/styles';

interface SectionBoxProps {
    title: string;
    titleComponent?: React.ReactNode,
}

export const SectionBox: React.FunctionComponent<SectionBoxProps> = ({ title, titleComponent, children, ...props }) => (
    <div
        style={{
            border: `1px solid ${COLORS.bg_light}`,
            backgroundColor: 'transparent',
            padding: METRICS.small_spacing,
            margin: METRICS.smallest_spacing,
            ...props,
        }}
    >
        {titleComponent || (
            <strong
                style={{
                    position: 'relative',
                    top: '-26px',
                    backgroundColor: COLORS.bg_main,
                    padding: `0 ${METRICS.smallest_spacing}`,
                }}
            >{title.toUpperCase()}</strong>
        )}
        {children}
    </div>
);

export default SectionBox;