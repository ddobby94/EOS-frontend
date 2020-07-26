import { PopUpProperties } from '../common/PopUp';
import { Variable } from './DataTable';
import { Filter } from '../../containers/_types/Project.types';

export const FILTER_TYPES = {
    RANGES: 'ranges',
    VALUES: 'values',
};

type Keys = keyof typeof FILTER_TYPES;
export type FilterTypes = typeof FILTER_TYPES[Keys];

export interface ToggleGroupSectionBoxTitleProps {
    selectedType: FilterTypes;
    setselectedType: (FilterTypes) => void;
}

export interface SelectedFilterData {
    filterName: string;
    selectedVariable: Variable;
    range?: [number, number];
    includeBorders?: boolean;
    valuesToInclude?: string[];
    valuesToExclude?: string[];
    createAnother: boolean;
}

export interface FilterPopUpProps extends Omit<PopUpProperties, 'title' | 'onApprove'> {
    variables: Variable[];
    addNewFilter: (f: Filter) => void;
}

export interface ProjectVersionPopUpProps extends Omit<PopUpProperties, 'onApprove'> {
    openSelectedDatasetAtVersion: (id: string) => void;
    currentVersion: number;
}