import React from 'react';
import Plot from 'react-plotly.js';
import { METRICS, COLORS } from '../../styles/styles';

interface PieChartProps {
    values: number[];
    labels: string[];
    title?: string;
}

export const PieChart: React.FunctionComponent<PieChartProps> = ({
    values,
    labels,
    title,
}) => (
    <>
        <h4 style={{ margin: 0, marginLeft: METRICS.smallest_spacing }}>{title}</h4>
        <Plot
            data={[
                {
                    values,
                    labels,
                    type: 'pie'
                },
            ]}
            layout={{
                showlegend: true,
                legend: {
                    orientation: 'h',
                },
                width: 150,
                height: 150,
                margin: {
                    l: 0,
                    r: 0,
                    t: 0,
                    b: 0,
                    autoexpand: false,
                },
                paper_bgcolor: 'transparent',
                colorway: [COLORS.success, COLORS.danger],
                autosize: true,
            }}
            config={{
                responsive: true,
                displayModeBar: false,
            }}
            style={{
                margin: METRICS.smallest_spacing,
            }}
        />
    </>
)