import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from './TableHeader';
import { EXPLORATORY_ANALYSIS_DATA_OBJECT } from '../../../__mocks__/exploratoryMocks';
import { TableHeader, Order } from '../_types/DataTable';
import { TableDropdownMenu, ROLES } from './TableDropdownMenu';
import { SimpleObject } from '../../types/commonTypes';
import { Icon } from '@material-ui/core';
import AccordionContent from './AccordionContent';
import TableToolbar from './TableToolbar';
import { getRowsPerPage, getComparator, stableSort, ROLE_HANDLING_LOGIC, downloadSelectedExploratory } from '../../utils/DataTableUtils';
import FilterPopUp from '../../containers/preprocessing/FilterPopUp';
import { Variable } from '../_types/DataTable';
import { DataTableOverride } from '../../styles/materialUIoverrides';

interface EnhancedTableProps {
    setTargetVariable: (v?: Variable) => void;
}

export const EnhancedTable: React.FunctionComponent<EnhancedTableProps> = ({ setTargetVariable }) => {
    const baseData = EXPLORATORY_ANALYSIS_DATA_OBJECT;
    const ROWS_PER_PAGE = getRowsPerPage(baseData.length);
    const classes = DataTableOverride();
    const [showFilterPopUp, setShowFilterPopUp] = React.useState<boolean>(false);
    const [forceUpdateCount, triggerForceUpdate] = React.useState<number>(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Variable>('name');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [opened, setOpened] = React.useState<SimpleObject<boolean>>({});
    const [page, setPage] = React.useState(0);
    const [targetName, setTargetName] = React.useState<string>();
    const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE[0]);

    const handleRequestSort = (property: keyof TableHeader) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = baseData.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (name: string) => {
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

        setOpened({
            ...opened,
            [id]: !opened[id],
        });
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const changeRowItemValue = (row, prop, newValue) => {
        row[prop] = newValue;
        triggerForceUpdate(forceUpdateCount + 1);
    }

    const setValueInRowByName = (name, value, valueToSet) => {
        const row = baseData.find(({ name: currentName }) => currentName === name);
        if (row) {
            row[valueToSet] = value;
        }
    }

    const updateAllTargetInstances = (v?: Variable) => {
        setTargetVariable(v);
        setTargetName((v || {}).name);
    }

    const onRoleChange = (row: Variable, newValue) => {

        // new TARGET selected
        if (newValue === ROLES.target.value) {
            if (!!targetName) {
                setValueInRowByName(targetName, ROLES.predictor.value, 'role');
            }
            updateAllTargetInstances(row);
        }

        // Current TARGET changed
        if (newValue !== ROLES.target.value && row.name === targetName) {
            updateAllTargetInstances(undefined);
        }
        changeRowItemValue(row, 'role', newValue);
    }

    const onTypeChange = (row: Variable, newValue) => {
        if (row.role === 'target' && newValue !== 'discrete') {
            onRoleChange(row, 'predictor');
        }
        changeRowItemValue(row, 'type', newValue);
    }


    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const isOpened = (id: string) => opened[id];

    const openFilterPopUp = (preSelectedId: string) => {
        setShowFilterPopUp(true);
        console.log({ TODO: preSelectedId });
    }

    const paginationSlice = () => [page * rowsPerPage, page * rowsPerPage + rowsPerPage];

    const getTableBody = () => {
        return stableSort(baseData, getComparator(order, orderBy))
            .slice(...paginationSlice())
            .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <>
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
                                    onClick={() => handleClick(row.name)}
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
                                    canBeTarget={ROLE_HANDLING_LOGIC.canBeTarget(row)}
                                    autoIgnore={ROLE_HANDLING_LOGIC.autoIgnore(row)}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TableDropdownMenu
                                    type="TYPES"
                                    value={row.type}
                                    onChange={(v) => onTypeChange(row, v)}
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
                            key={`accordion-${row.name}`}
                            row={row}
                            isOpen={isOpened(row.name)}
                            openFilterCreator={openFilterPopUp}
                        />
                        {showFilterPopUp && (
                            <FilterPopUp
                                onClose={() => setShowFilterPopUp(false)}
                                variables={baseData}
                            />
                        )}
                    </>
                );
            })
    }

    return (
        <div className="tableContent-rootContainer">
            <TableToolbar
                selected={selected}
                targetName={targetName}
                onExportSelected={() => downloadSelectedExploratory(baseData, selected, 'EXP_TEST')}
            />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="small"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={baseData.length}
                    />
                    <TableBody>
                        {getTableBody()}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={ROWS_PER_PAGE}
                component="div"
                count={baseData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(e, newPage) => setPage(newPage)}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default EnhancedTable;
