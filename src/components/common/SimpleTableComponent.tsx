import React from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, TableHead, TableSortLabel, Icon, Button, Popper, Paper } from '@material-ui/core';
import { SimpleObject } from '../../types/commonTypes';
import { stableSort } from '../../utils/DataTableUtils';

const descendingComparator = (a, b, orderBy) => {
    if (b.values[orderBy] < a.values[orderBy]) {
        return -1;
    }
    if (b.values[orderBy] > a.values[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

type Order = 'asc' | 'desc';
interface HeaderObj {
    key: string;
    label: string;
}

interface BaseRowObject<T = any> {
    isActive?: boolean;
    id: string;
    values: SimpleObject<T>;
}

export type rowAction = {
    title: string;
    onClick: (id: string) => void;
}

interface SimpleTableComponentProps {
    data: BaseRowObject[];
    titleArray: HeaderObj[];
    onSetActive?: (id: string, isActive: boolean) => void;
    onDeleteRow?: (id: string) => void;
    emphasizedRowButton?: {
        title: string;
        onClick: (id: string) => void;
    };
    rowActions?: rowAction[];
}

const SimpleTableComponent: React.FunctionComponent<SimpleTableComponentProps> = ({
    data,
    titleArray,
    onSetActive,
    onDeleteRow,
    emphasizedRowButton,
    rowActions,
}) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onRowActionsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl?.id === event.currentTarget.id ? null : event.currentTarget);
    };

    const handleRequestSort = (event: React.MouseEvent<any>, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, property);
    };

    if (!data.length) {
        return (
            <p>NO DATA :(</p>
        )
    }


    return (
        <TableContainer>
            <Table
                size="small"
            >
                <TableHead>
                    <TableRow>
                        {onSetActive && (
                            <TableCell padding="checkbox">
                                {/*  TODO select-all <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={rowCount > 0 && numSelected === rowCount}
                                    onChange={onSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                /> */}
                            </TableCell>
                        )}
                        {titleArray.map((headCell) => (
                            <TableCell
                                key={headCell.key}
                                align="left"
                                padding="none"
                                sortDirection={orderBy === headCell.key ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.key}
                                    direction={orderBy === headCell.key ? order : 'asc'}
                                    onClick={createSortHandler(headCell.key)}
                                    className="tableHeader-text"
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        {onDeleteRow && (
                            <TableCell padding="checkbox" />
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                    .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            aria-checked={row.isActive}
                            tabIndex={-1}
                            key={row.id}
                        >
                            {onSetActive && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={row.isActive}
                                        onChange={() => onSetActive(row.id, !row.isActive)}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                            )}
                            {titleArray.map(({ key }, i) => (
                                <TableCell
                                    key={`${row.values[key]}-${key}-${i}`}
                                >
                                    {row.values[key]}
                                </TableCell>
                            ))}
                            {onDeleteRow && (
                                <TableCell padding="checkbox">
                                    <Icon
                                        className="fa fa-trash"
                                        onClick={() => onDeleteRow(row.id)}
                                    />
                                </TableCell>
                            )}
                            {emphasizedRowButton && (
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        children={emphasizedRowButton.title}
                                        onClick={() => emphasizedRowButton.onClick(row.id)}
                                    />
                                </TableCell>
                            )}
                            {rowActions && (
                                <TableCell>
                                    <Button
                                        id={`${row.id}-rowActionBtn`}
                                        onClick={onRowActionsClick}
                                    >
                                        <Icon
                                            className="fa fa-ellipsis-v"
                                        />
                                    </Button>
                                    {/* TODO: create a row container for handling active popups */}
                                    <Popper
                                        id={!!anchorEl ? 'simple-popper' : undefined}
                                        open={!!anchorEl}
                                        anchorEl={anchorEl}
                                        style={{ zIndex: 11 }}
                                    >
                                        <Paper >
                                            {rowActions?.map(({ title, onClick }, i) => (
                                                <Button
                                                    key={`${title}-${i}`}
                                                    children={title}
                                                    onClick={() => onClick(row.id)}
                                                />

                                            ))}

                                        </Paper>
                                    </Popper>
                                </TableCell>
                            )}
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SimpleTableComponent;