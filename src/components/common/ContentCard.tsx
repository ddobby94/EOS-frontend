import React from "react";
import { COLORS, METRICS } from "../../styles/styles";

interface ContentCardProps {
    title: string;
};

// TODO move styles to .scss
export const ContentCard: React.FunctionComponent<ContentCardProps> = ({ title, children, ...props }) => (
    <div
        style={{
            backgroundColor: COLORS.bg_main,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            padding: METRICS.medium_spacing,
            margin: `${METRICS.medium_spacing} auto`,
            width: 'fit-content',
            minWidth: '55vw',
            maxWidth: '95vw',
            alignSelf: 'center',
            maxHeight: '73vh',
            overflow: 'auto',
        }}
        {...props}
    >
        <h3
            style={{
                margin: 0,
                fontWeight: 'normal',
            }}
        >
            {title}
        </h3>
        {children}
    </div>
);

export default (ContentCard);