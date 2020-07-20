import * as React from 'react';
import { Chip } from "@material-ui/core";
import '../_styles/common.scss';

type ChipData = string[];

interface ChipListProps {
    variablesList: ChipData;
    onDelete: (selected: string) => void;
}

export const ChipList: React.FunctionComponent<ChipListProps> = ({ variablesList, onDelete }) => (
    <div className="chipListInput-chipsContainer">
        {variablesList.map((value, i) => (
            <Chip
                className="chipListInput-chip"
                key={`${value}-${i}`}
                label={value}
                onDelete={() => onDelete(value)}
                color="primary"
            />
        ))}
    </div>
);

export default ChipList;
