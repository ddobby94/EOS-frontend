import * as React from 'react';
import '../_styles/common.scss';
import { COLORS } from "../../styles/styles";

interface ChipProperties {
    title: string;
    description: string;
    color?: string;
}

export const Chip: React.FunctionComponent<ChipProperties> = ({ title, description, color }) => (
    <div
        className="chipContainer"
        style={{
            backgroundColor: COLORS.makeTransparent(color, 20),
            borderColor: color,
        }}
    >
        <p>{title}:</p>
        <strong>{description}</strong>
    </div>
);

export default Chip;
