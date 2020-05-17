import React from "react";
import { FormControl, Select, MenuItem, makeStyles } from "@material-ui/core";
import { Roles, Types } from "../_types/DataTable";

const transparentColor = (color: string) => `${color}44`;


export const ROLES: Roles = {
    target: {
        value: 'target',
        color: '#D79E80',
    },
    predictor: {
        value: 'predictor',
        color: '#1BB97F',
    },
    explanatory: {
        value: 'explanatory',
        color: '#1BB97F',
    },
    key: {
        value: 'key',
        color: '#38EFB9',
    },
    ignore: {
        value: 'ignore',
        color: '#88FEE0',
    },
};

export const TYPES: Types = {
    continuous: {
        value: 'continuous',
        color: '#B2F2FF',
    },
    discrete: {
        value: 'discrete',
        color: '#71DEFF',
    },
    categorical: {
        value: 'categorical',
        color: '#0082FB',
    },
};

const TABLE_DROPDOWN_VALUES = {
    ROLES,
    TYPES,
}

interface TableDropdownProps {
    type: 'ROLES' | 'TYPES',
    onChange: (string) => void,
    value: keyof Roles | keyof Types;
};

const useStyles = (color) => makeStyles(() => ({
    outlined: {
        backgroundColor: transparentColor(color),
    },
    root: {
        backgroundColor: transparentColor(color),
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: `${color} !important`,
              borderWidth: '2px',
              '&:focus': {
                borderColor: color,
              }
            },
        },
    }
}));


export const TableDropdown: React.FunctionComponent<TableDropdownProps> = ({ type = 'ROLES', onChange, value = '' }) => {
    const dataset = TABLE_DROPDOWN_VALUES[type];
    const firstItemKey = Object.keys(dataset)[0];
    const selected = dataset[value.toLowerCase() || firstItemKey];

    console.log({
        value, selected, type
    })

    const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
        const v = event.target.value;
        const newSelected = dataset[v];
        onChange(newSelected.value);
        event.stopPropagation();
    };

    const classes = useStyles(selected.color)();

    return (
        <div>
            <FormControl
                variant="outlined"
                classes={{
                    root: classes.root
                }}
            >
                <Select
                    classes={classes}
                    inputProps={{
                        classes
                    }}
                    autoWidth={true}
                    id="demo-simple-select-outlined"
                    value={selected.value}
                    onChange={handleChange}
                >
                    {Object.values(dataset).map(({ value }, i) => (
                        <MenuItem key={value + i} value={value}>{value.toUpperCase()}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default (TableDropdown);