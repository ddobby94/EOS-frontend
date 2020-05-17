

interface DropDownItem {
    value: string;
    color: string;
}

export interface Roles {
    target: DropDownItem;
    predictor: DropDownItem;
    key: DropDownItem;
    ignore: DropDownItem;
    explanatory: DropDownItem;
};

export interface Types {
    continuous: DropDownItem;
    discrete: DropDownItem;
    categorical: DropDownItem;
}


export interface TableHeader {
    name: string;
    role: keyof Roles;
    type: keyof Types;
    missingValuessPercentage: number;
    uniqueValues: number,
    median: number,
    mean: number,
}

export interface ExploratoryObj extends TableHeader {
    label: string;
    validObs: number;
    missingValues: number;
    median: number;
    min: number;
    max: number;
    mean: number;
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
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
    disablePadding: boolean;
    id: keyof TableHeader;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableHeaderProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableHeader) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

