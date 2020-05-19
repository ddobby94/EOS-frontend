import React from "react";
import { isActiveClassName } from "../utils/stylingHelpers";
import './_styles/ProgressBar.scss';

interface ProgressBarProps {
    items: string[];
    active: number;
    onChange: (index: number) => void;
};

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({ items, onChange, active }) => {
    const onPreviousSelected = (index: number) => {
        if (index < active - 1) {
            onChange(index);
        }
    }

    const getHr = (index, arr) => (arr.length - 1 !== index && <hr className={isActiveClassName(index <= active - 1, 'bar-line')}/>);

    const itemMapper = (itemName, index, arr) => (
        <div
            className={isActiveClassName(index <= active, 'bar-items')}
            key={index}
        >
            <div className="bar-dotLineContainer">
                {getHr(index, arr)}
                <div
                    onClick={() => onPreviousSelected(index)}
                    className="bar-dot"
                />
            </div>
            <p
                onClick={() => onPreviousSelected(index)}
                className="bar-title"
            >
                {itemName}
            </p>
        </div>
    );

    return (
        <div className="bar-progContainer">
            {items.map(itemMapper)}
        </div>
    );
};

export default (ProgressBar);