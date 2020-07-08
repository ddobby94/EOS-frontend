export interface DropDownItem<T> {
    value: T;
    color: string;
}

export interface Roles {
    target: DropDownItem<"target">;
    predictor: DropDownItem<"predictor">;
    ignore: DropDownItem<"ignore">;
};

export interface Types {
    continuous: DropDownItem<"continuous">;
    discrete: DropDownItem<"discrete">;
    categorical: DropDownItem<"categorical">;
}


export interface TableHeader {
    name: string;
    role: keyof Roles;
    type: keyof Types;
    missingValuessPercentage: number;
    uniqueValues: number;
    median: number;
    mean: number;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
    disablePadding: boolean;
    id: keyof TableHeader;
    label: string;
    numeric?: boolean;
}

export interface EnhancedTableHeaderProps {
    numSelected: number;
    onRequestSort: (property: keyof TableHeader) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export type ComparatorValueTypes = string | number | boolean | ExpChartData;
// eslint-disable-next-line
export type ComparatorFunction = <Key extends keyof any>(
    a: { [key in Key]: ComparatorValueTypes }, b: { [key in Key]: ComparatorValueTypes }) => number;
export type GetComparatorFunction = <Key extends keyof Variable>(
    order: Order, orderBy: Key) => ComparatorFunction;


export interface EnhancedTableToolbarProps {
    selected: string[];
    onExportSelected: () => void;
    targetName?: string;
}

export interface ContentChartProps {
    chartData: ExpChartData;
}

export interface ExpChartData {
    [categoryId: string]: {
        categoryName: string;
        totalTrips: number;
        totalTripsPercentage: number;
        unproductiveTrips: number;
    }
}

export interface Variable {
    name: string;
    role: keyof Roles;
    type: keyof Types;
    missingValuessPercentage: number;
    uniqueValues: number;
    median: number;
    mean: number;
    label: string;
    validObs: number;
    missingValues: number;
    min: number;
    max: number;
    stdDev: number;
    range: number;
    mode: number;
    P1: number;
    P5: number;
    P10: number;
    Q1: number;
    Q3: number;
    P90: number;
    P95: number;
    P99: number;
    autoIgnored: boolean;
    chartData: ExpChartData;
    IQR: number;
    CV: number;
};
