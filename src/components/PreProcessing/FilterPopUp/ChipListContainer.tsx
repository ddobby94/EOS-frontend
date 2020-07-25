import React from 'react';
import SectionBox from "../../common/SectionBox";
import { TextField, Button } from "@material-ui/core";
import '../../_styles/common.scss';
import ChipList from '../../common/ChipList';

interface InitialStateType {
    valuesToInclude: Set<string>;
    valuesToExclude: Set<string>;
}

const initialState: InitialStateType = {
    valuesToInclude: new Set<string>(),
    valuesToExclude: new Set<string>(),
};

export const CHIPLIST_TYPES = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
}

const TITLES = {
    [CHIPLIST_TYPES.INCLUDE]: {
        sectionBox: 'Included variables',
        inputLabel: 'Value to include',
        button: 'ADD TO INCLUDE',
    },
    [CHIPLIST_TYPES.EXCLUDE]: {
        sectionBox: 'Excluded variables',
        inputLabel: 'Value to exclude',
        button: 'ADD TO EXCLUDE',
    },
}

const STATES = {
    ADD_INCLUDE: 'ADD_INCLUDE',
    DELETE_INCLUDE: 'DELETE_INCLUDE',
    ADD_EXCLUDE: 'ADD_EXCLUDE',
    DELETE_EXCLUDE: 'DELETE_EXCLUDE',
    RESET: 'RESET',
}

function reducer(state: InitialStateType, action: { type: string, payload: string }): InitialStateType {
    switch (action.type) {
        case STATES.ADD_INCLUDE: {
            return {
                ...state,
                valuesToInclude: state.valuesToInclude.add(action.payload),
            };
        }
        case STATES.DELETE_INCLUDE: {
            state.valuesToInclude.delete(action.payload);
            return {
                ...state,
                valuesToInclude: new Set(state.valuesToInclude),
            };
        }
        case STATES.ADD_EXCLUDE: {
            return {
                ...state,
                valuesToExclude: state.valuesToExclude.add(action.payload),
            };
        }
        case STATES.DELETE_EXCLUDE: {
            state.valuesToExclude.delete(action.payload);
            return {
                ...state,
                valuesToExclude: new Set(state.valuesToExclude),
            };
        }
        case STATES.RESET: {
            return {
                valuesToInclude: new Set(),
                valuesToExclude: new Set(),
            };
        }
        default:
            throw new Error();
    }
}

interface VariableSelectableChipListProps {
    type: keyof typeof CHIPLIST_TYPES;
    onChange: (valuesList: string[]) => void;
}

export const VariableSelectableChipList: React.FunctionComponent<VariableSelectableChipListProps> = ({
    type,
    onChange,
}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [inputValue, setInputValue] = React.useState<string>('');

    const valuesList = type === CHIPLIST_TYPES.INCLUDE ? state.valuesToInclude : state.valuesToExclude;
    const addFunctionKey = type === CHIPLIST_TYPES.INCLUDE ? STATES.ADD_INCLUDE : STATES.ADD_EXCLUDE;
    const deleteFunctionKey = type === CHIPLIST_TYPES.INCLUDE ? STATES.DELETE_INCLUDE : STATES.DELETE_EXCLUDE;

    const onAdd = () => {
        dispatch({ type: addFunctionKey, payload: inputValue });
        setInputValue('');
        onChange([ ...valuesList ]);
    };

    const onDelete = (key: string) => {
        dispatch({ type: deleteFunctionKey, payload: key });
        onChange([ ...valuesList ]);
    };

    return (
        <SectionBox
            title={TITLES[type].sectionBox}
        >
            <ChipList
                variablesList={[...valuesList]}
                onDelete={onDelete}
            />
            <div className="chipListInput-inputFields">
                <TextField
                    className="selected-input-One"
                    label={TITLES[type].inputLabel}
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onAdd();
                        }
                    }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onAdd}
                    children={TITLES[type].button}
                />
            </div>
        </SectionBox>
    );
}


export default VariableSelectableChipList;