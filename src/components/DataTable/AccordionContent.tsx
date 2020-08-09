import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../_styles/DataTable.scss';
import { EMPTY_DATA } from '../../utils/DataTableUtils';
import ContentChart from './ContentChart';
import { Button } from '@material-ui/core';
import { Variable } from '../_types/DataTable';

export const HEAD = ['MIN', 'MAX', 'MODE', 'RANGE', 'CV', 'IQR', 'SD'];
export const CONTENT_KEYS = ['min', 'max', 'mode', 'range', 'CV', 'IQR', 'stdDev'];

const formatNumber = (num: number) => {
    if (isNaN(num)) {
        return EMPTY_DATA;
    }
    return +num.toFixed(5);
}

interface AccordionContentProps {
    row: Variable;
    isOpen: boolean;
    openFilterCreator: (id: string) => void;
};

export const AccordionContent: React.FunctionComponent<AccordionContentProps> = ({ row, isOpen, openFilterCreator }) => {
    if (!isOpen) {
        return (<></>);
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
                    <div className="accordionContent-chartContainer">
                        <h3>Predictor distribution analysis</h3>
                        <ContentChart
                            chartData={row.chartData}
                        />
                    </div>
                    <div className="accordionContent-detailedContainer" >
                        <h3>Detailed information</h3>
                        <table className="accordionContent-detailedTable" cellSpacing="0">
                            <thead>
                                <tr>
                                    {HEAD.map((v) => (
                                        <th key={v}>{v}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {CONTENT_KEYS.map((key) => (
                                        <td key={`${row.name}-${key}`} >{formatNumber(row[key])}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => openFilterCreator(row.name)}
                        >
                            CREATE FILTER
                        </Button>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default AccordionContent;
