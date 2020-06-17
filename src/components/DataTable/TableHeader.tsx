import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { TableHeader, HeadCell, EnhancedTableHeaderProps } from '../_types/DataTable';
import '../_styles/DataTable.scss';

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
    { id: 'name', disablePadding: true, label: 'Name' },
    { id: 'role', disablePadding: false, label: 'Role' },
    { id: 'type', disablePadding: false, label: 'Type' },
    { id: 'missingValuessPercentage', disablePadding: false, label: '%Missing values' },
    { id: 'uniqueValues', disablePadding: false, label: 'Unique values' },
    { id: 'median', disablePadding: false, label: 'Median' },
    { id: 'mean', disablePadding: false, label: 'Mean' },
];

export const EnhancedTableHead: React.FunctionComponent<EnhancedTableHeaderProps> = ({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}) => {

    const createSortHandler = (property: keyof TableHeader) => () => {
        onRequestSort(property);
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
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            className="tableHeader-text"
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
