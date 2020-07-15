import React from 'react';
import { COLORS, METRICS } from '../../styles/styles';
import { SimpleObject } from '../../types/commonTypes';

interface SectionBoxProps {
    title: string;
    titleComponent?: React.ReactNode,
    style?: SimpleObject<string | number>;
    titleStyle?: SimpleObject<string | number>;
}

export const SectionBox: React.FunctionComponent<SectionBoxProps> = ({
    title,
    titleComponent,
    children,
    style,
    titleStyle,
}) => (
    <div
        style={{
            border: `1px solid ${COLORS.bg_light}`,
            backgroundColor: 'transparent',
            padding: METRICS.small_spacing,
            margin: METRICS.smallest_spacing,
            ...style,
        }}
    >
        {titleComponent || (
            <strong
                style={{
                    position: 'relative',
                    top: '-26px',
                    backgroundColor: COLORS.bg_main,
                    padding: `0 ${METRICS.smallest_spacing}`,
                    ...titleStyle,
                }}
            >{title.toUpperCase()}</strong>
        )}
        {children}
    </div>
);

export default SectionBox;