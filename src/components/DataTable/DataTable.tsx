import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from './TableHeader';
import { EXPLORATORY_ANALYSIS_DATA_OBJECT } from '../../utils/mocks';
import { ExploratoryObj, TableHeader, Order } from '../_types/DataTable';
import { TableDropdownMenu, ROLES } from './TableDropdownMenu';
import { SimpleObject } from '../../types/commonTypes';
import { Icon } from '@material-ui/core';
import AccordionContent from './AccordionContent';
import TableToolbar from './TableToolbar';
import { getRowsPerPage, getComparator, stableSort } from '../../utils/DataTableUtils';

const rows = EXPLORATORY_ANALYSIS_DATA_OBJECT;

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            minWidth: 750,
        },
    }),
);

export default function EnhancedTable() {
    const ROWS_PER_PAGE = getRowsPerPage(rows.length);
    const classes = useStyles();
    const [forceUpdateCount, triggerForceUpdate] = React.useState<number>(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ExploratoryObj>('name');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [opened, setOpened] = React.useState<SimpleObject<boolean>>({});
    const [page, setPage] = React.useState(0);
    const [targetName, setTargetName] = React.useState<string>();
    const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE[0]);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TableHeader) => {
        console.log({ event });
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        console.log({ event });
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const openRow = (e: React.MouseEvent<unknown>, id: string) => {
        e.stopPropagation();
        // TODO currently using name as id
        // will it be unique ??
        setOpened({
            ...opened,
            [id]: !opened[id],
        });
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const changeRowItemValue = (row, prop, newValue) => {
        row[prop] = newValue;
        triggerForceUpdate(forceUpdateCount + 1);
    }

    const setValueInRowByName = (name, value, valueToSet) => {
        const row = rows.find(({ name: currentName }) => currentName === name);
        console.log({ row });
        if (row) {
            row[valueToSet] = value;
        }
    }

    const onRoleChange = (row: ExploratoryObj, newValue) => {

        // new TARGET selected
        console.log({ newValue, targetName, asd: ROLES.target.value, tureee: ROLES.target.value === newValue })
        if (newValue === ROLES.target.value) {
            if (!!targetName) {
                setValueInRowByName(targetName, ROLES.predictor.value, 'role');
            }
            setTargetName(row.name);
        }

        // Current TARGET changed
        if (newValue !== ROLES.target.value && row.name === targetName) {
            setTargetName(undefined);
        }
        changeRowItemValue(row, 'role', newValue);
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const isOpened = (id: string) => opened[id];

    const paginationSlice = () => [page * rowsPerPage, page * rowsPerPage + rowsPerPage];

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const getTableBody = () => {
        return stableSort(EXPLORATORY_ANALYSIS_DATA_OBJECT, getComparator(order, orderBy))
        .slice(...paginationSlice())
        .map((row, index) => {
            const isItemSelected = isSelected(row.name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
                <div key={row.name}>
                    <TableRow
                        hover
                        role="dropdown"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        className="tableContent-tableRow"
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={(e) => handleClick(e, row.name)}
                            />
                        </TableCell>
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            className={row.role === ROLES.ignore.value ? 'tableContent-nameCell_ignored' : ''}
                        >
                            {row.name}
                        </TableCell>
                        <TableCell align="left">
                            <TableDropdownMenu
                                type="ROLES"
                                value={row.role}
                                onChange={(v) => onRoleChange(row, v)}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <TableDropdownMenu
                                type="TYPES"
                                value={row.type}
                                onChange={(v) => changeRowItemValue(row, 'type', v)}
                            />
                        </TableCell>
                        <TableCell align="left">{row.missingValuessPercentage}</TableCell>
                        <TableCell align="left">{row.uniqueValues}</TableCell>
                        <TableCell align="left">{row.median}</TableCell>
                        <TableCell align="left">{row.mean}</TableCell>
                        <TableCell >
                            <Icon
                                color="secondary"
                                className="fa fa-chevron-down tableContent-openRowIcon"
                                onClick={(e) => openRow(e, row.name)}
                                style={{
                                    transform: isOpened(row.name) ? 'rotate(180deg)' : '',
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <AccordionContent
                        row={row}
                        isOpen={isOpened(row.name)}
                    />
                </div>
            );
        })
    }

    return (
        <div className="tableContent-rootContainer">
            <TableToolbar
                selected={selected}
                targetName={targetName}
                onExportSelected={console.log}
            />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="medium"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {getTableBody()}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={ROWS_PER_PAGE}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}
