import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from './TableHeader';
import { EXPLORATORY_ANALYSIS_DATA_OBJECT } from '../../utils/mocks';
import { ExploratoryObj, TableHeader } from '../_types/DataTable';
import { TableDropdownMenu } from './TableDropdownMenu';
import { SimpleObject } from '../../types/commonTypes';
import { Icon } from '@material-ui/core';
import AccordionContent from './AccordionContent';

const rows = EXPLORATORY_ANALYSIS_DATA_OBJECT;

function descendingComparator<T>(a: T, b: T, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

type ComparatorValueTypes = string | number | boolean;
type ComparatorFunction = <Key extends keyof any>(a: { [key in Key]: ComparatorValueTypes }, b: { [key in Key]: ComparatorValueTypes }) => number;
type GetComparatorFunction = <Key extends keyof ExploratoryObj>(order: Order, orderBy: Key) => ComparatorFunction;


const getComparator: GetComparatorFunction = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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


const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight: theme.palette.type === 'light' ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            } : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
        {numSelected > 0 && (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                {numSelected} selected
            </Typography>
        )}
        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

export default function EnhancedTable() {
    const classes = useStyles();
    const [forceUpdateCount, triggerForceUpdate] = React.useState<number>(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ExploratoryObj>('name');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [opened, setOpened] = React.useState<SimpleObject<boolean>>({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
                <>
                    <TableRow
                        hover
                        role="dropdown"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={(e) => handleClick(e, row.name)}
                            />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">
                            <TableDropdownMenu
                                type="ROLES"
                                value={row.role}
                                onChange={(v) => changeRowItemValue(row, 'role', v)}
                            />
                        </TableCell>
                        <TableCell align="right">
                            <TableDropdownMenu
                                type="TYPES"
                                value={row.type}
                                onChange={(v) => changeRowItemValue(row, 'type', v)}
                            />
                        </TableCell>
                        <TableCell align="right">{row.missingValuessPercentage}</TableCell>
                        <TableCell align="right">{row.uniqueValues}</TableCell>
                        <TableCell align="right">{row.median}</TableCell>
                        <TableCell align="right">{row.mean}</TableCell>
                        <TableCell >
                            <Icon
                                color="secondary"
                                className="fa fa-bars"
                                onClick={(e) => openRow(e, row.name)}
                                style={{
                                    transform: isOpened(row.name) ? 'rotate(45deg)' : '',
                                    transition: 'all 235ms ease-in-out',
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <AccordionContent
                        row={row}
                        isOpen={isOpened(row.name)}
                    />
                </>
            );
        })
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
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
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
