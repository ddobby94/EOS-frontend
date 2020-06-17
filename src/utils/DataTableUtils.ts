import { GetComparatorFunction, ExploratoryObj } from "../components/_types/DataTable";
import { SimpleObject } from "../types/commonTypes";

export const ROWS_PER_PAGE_BASE_NUMBERS = [10, 25, 50, 100, 200, 400];
export const getRowsPerPage = (max: number) => {
    const smallerThanMaxIndex = ROWS_PER_PAGE_BASE_NUMBERS.findIndex((v) => v >= max);

    return [...ROWS_PER_PAGE_BASE_NUMBERS.slice(0, smallerThanMaxIndex), max];
}

export const descendingComparator = <T>(a: T, b: T, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator: GetComparatorFunction = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order
        };
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const ROLE_HANDLING_LOGIC: SimpleObject<(rowItem: ExploratoryObj) => boolean> = {
    canBeTarget: (row) => {
        return row.min === 0 && row.max === 1 && row.uniqueValues === 2 && row.type === 'discrete';
    },
    autoIgnore: (row) => {
        return row.missingValuessPercentage === 100 || row.uniqueValues === 1 || (row.type === 'categorical' && row.uniqueValues > 100);
    }
};
