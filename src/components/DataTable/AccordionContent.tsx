import React from 'react';
// import clsx from 'clsx';
// import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import EnhancedTableHead from './TableHeader';
// import { EXPLORATORY_ANALYSIS_DATA_OBJECT } from '../../utils/mocks';
import { ExploratoryObj } from '../_types/DataTable';
// import { TableDropdownMenu } from './TableDropdownMenu';
// import { SimpleObject } from '../../types/commonTypes';
// import { Icon } from '@material-ui/core';
import '../_styles/DataTable.scss';

export const HEAD = ['MIN', 'MAX', 'MODE', 'RANGE', 'CV', 'IQR', 'SD'];

interface AccordionContentProps {
    row: ExploratoryObj;
    isOpen: boolean;
};

export const AccordionContent: React.FunctionComponent<AccordionContentProps> = ({ row, isOpen }) => {
    if (!isOpen) {
        return (<div />);
    }


    return (
        <TableRow
            style={{
                transition: 'all 235ms ease-in-out',
                height: !isOpen ? 0 : '100px',
                maxHeight: !isOpen ? 0 : '100px',
                opacity: !isOpen ? 0 : 1,
            }}
        >
            <TableCell
                colSpan={122}
                style={{
                    transition: 'all 235ms ease-in-out',
                    height: !isOpen ? 0 : '100px',
                    maxHeight: !isOpen ? 0 : '100px',
                    padding: !isOpen ? 0 : 'auto',
                }}
            >
                <div className="accordionContent">
                    <div>
                        <h3>PREDICTOR DISTRIBUTION ANALYSIS</h3>
                        <div className="accordionContent-chart">
                            CHART HERE
                            {row.name}
                        </div>
                    </div>
                    <div>
                        <h3>Detailed datas</h3>
                        <table>
                            <thead>
                                <tr>
                                    {HEAD.map((v) => (
                                        <th key={v}>{v}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{row.min}</td>
                                    <td>{row.max}</td>
                                    <td>{row.mode}</td>
                                    <td>{row.range}</td>
                                    <td>????</td>
                                    <td>????</td>
                                    <td>????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default AccordionContent;
