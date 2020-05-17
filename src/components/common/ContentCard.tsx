import React from "react";
import { COLORS, METRICS } from "../../styles/styles";

interface ContentCardProps {
    title: string;
};

export const ContentCard: React.FunctionComponent<ContentCardProps> = ({ title, children, ...props }) => (
    <div
        style={{
            backgroundColor: COLORS.bg_main,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            padding: METRICS.medium_spacing,
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