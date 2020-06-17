import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { ExploratoryObj } from '../_types/DataTable';
import '../_styles/DataTable.scss';

export const HEAD = ['MIN', 'MAX', 'MODE', 'RANGE', 'CV', 'IQR', 'SD'];

interface AccordionContentProps {
    row: ExploratoryObj;
    isOpen: boolean;
};

export const AccordionContent: React.FunctionComponent<AccordionContentProps> = ({ row, isOpen }) => {
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
                        <div className="accordionContent-chart">
                            TODO CHART PLACEHOLDER
                        </div>
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
