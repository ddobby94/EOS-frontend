import { PopUpProperties } from '../common/PopUp';
import { Variable } from './DataTable';

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


export interface FilterPopUpProps extends Omit<PopUpProperties, 'title' | 'onApprove'> {
    // onApprove?: () => void;
    variables: Variable[];
}