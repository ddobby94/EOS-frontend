import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { TableHeader, HeadCell, Order } from '../_types/DataTable';

export const EXPLORATORY_ANALYSIS_HEADERS =  [
    'Name',
    'Role',
    'Type',
    '%Missing values',
    'Unique values',
    'Median',
    'Mean',
];

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'missingValuessPercentage', numeric: true, disablePadding: false, label: '%Missing values' },
  { id: 'uniqueValues', numeric: true, disablePadding: false, label: 'Unique values' },
  { id: 'median', numeric: true, disablePadding: false, label: 'Median' },
  { id: 'mean', numeric: true, disablePadding: false, label: 'Mean' },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableHeader) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof TableHeader) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                        {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="checkbox" />
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;
