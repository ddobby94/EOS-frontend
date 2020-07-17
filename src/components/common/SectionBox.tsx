import React from 'react';
import { SimpleObject } from '../../types/commonTypes';
import '../_styles/common.scss';

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
            ...style,
        }}
        className="sectionBox"
    >
        {titleComponent || (
            <strong
                className="sectionBox-title"
                style={{
                    ...titleStyle,
                }}
            >{title.toUpperCase()}</strong>
        )}
        {children}
    </div>
);

export default SectionBox;