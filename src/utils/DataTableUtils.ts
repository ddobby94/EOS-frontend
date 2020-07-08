import { GetComparatorFunction, Variable, ExpChartData } from "../components/_types/DataTable";
import { SimpleObject } from "../types/commonTypes";
import XLSX from 'xlsx';

export const EMPTY_DATA = 'N/A';
export const EXPLORATORY_ANALYSIS_KEYS = [
    'name',
    'label',
    'role',
    'type',
    'validObs',
    'missingValues',
    'missingValuessPercentage',
    'uniqueValues',
    'min',
    'max',
    'mean',
    'stdDev',
    'range',
    'mode',
    'P1',
    'P5',
    'P10',
    'Q1',
    'median',
    'Q3',
    'P90',
    'P95',
    'P99',
    'autoignored',
];

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

export const ROLE_HANDLING_LOGIC: SimpleObject<(rowItem: Variable) => boolean> = {
    canBeTarget: (row) => {
        return row.min === 0 && row.max === 1 && row.uniqueValues === 2 && row.type === 'discrete';
    },
    autoIgnore: (row) => {
        return row.missingValuessPercentage === 100 || row.uniqueValues === 1 || (row.type === 'categorical' && row.uniqueValues > 100);
    }
};

const EXP_WORKSHEET_NAME = 'EXPLORATORY TABLE'
const CHART_WORKSHEET_NAME = 'CHART DATASET'
const CHART_HEADERS = ['Total Trips', '%of Total Trips', '%Unproductive Trips'];
const getChartHeaders = (varName: string): string[] => [varName, ...CHART_HEADERS];

const getFullDate = (separator = '_') => `${new Date().getFullYear()}${separator}${new Date().getMonth() + 1}${separator}${new Date().getDate()}`

const expObjMapper = (expObj: Variable) => {
    const arr: (number | string | boolean)[] = [];
    EXPLORATORY_ANALYSIS_KEYS.forEach((headerKey: string) => {
        arr.push(expObj[headerKey]);
    });

    return arr;
}

const constructExpDataSheet = (selectedData: Variable[]) => {
    let expSheetData = [
        EXPLORATORY_ANALYSIS_KEYS,
        ...selectedData.map(expObjMapper),
    ];

    return XLSX.utils.aoa_to_sheet(expSheetData);
}

const constructChartDataSheet = (chartData: SimpleObject<ExpChartData>) => {
    let sheetData: (string | number)[][] = [];

    for (const variable in chartData) {
        if (chartData[variable]) {
            const catData = chartData[variable]
            sheetData.push(getChartHeaders(variable));
            for (const category in catData) {
                if (catData[category]) {
                    const {
                        categoryName,
                        totalTrips,
                        totalTripsPercentage,
                        unproductiveTrips,
                    } = catData[category];

                    sheetData.push([categoryName, totalTrips, totalTripsPercentage, unproductiveTrips]);
                }
            }
        }
    }
    return XLSX.utils.aoa_to_sheet(sheetData);
}

export const downloadSelectedExploratory = (baseData: Variable[], selected: string[], fileName: string) => {
    let newWorkBook = XLSX.utils.book_new();
    const selectedChartData = {};

    const selectedData = baseData.filter((v) => {
        const found = selected.indexOf(v.name) !== -1;
        if (found && v.chartData) {
            selectedChartData[v.name] = v.chartData;
        }
        return found;
    });


    XLSX.utils.book_append_sheet(newWorkBook, constructExpDataSheet(selectedData), EXP_WORKSHEET_NAME);
    if (Object.keys(selectedChartData).length) {
        XLSX.utils.book_append_sheet(newWorkBook, constructChartDataSheet(selectedChartData, ), CHART_WORKSHEET_NAME);
    }

    XLSX.writeFile(newWorkBook, `${fileName}_${getFullDate()}.xlsx`);
}