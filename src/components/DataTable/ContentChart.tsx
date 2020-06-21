import React from 'react';
import { ContentChartProps, ExpChartData } from '../_types/DataTable';
import '../_styles/DataTable.scss';
import Plot from 'react-plotly.js';
import { COLORS } from '../../styles/styles';
import { SimpleObject } from '../../types/commonTypes';

const getPlotObj = (name, x, y, color, type ='bar', yaxis = 'y') => {
    return {
        x,
        y,
        type,
        mode: 'lines+markers',
        yaxis,
        marker: { color },
        name,
    };
}

const constructChartData = (chartData: ExpChartData): SimpleObject[] => {
    const keys: string[] = [];
    const totalTrips: number[] = [];
    const totalTripsPerc: number[] = [];
    const unproductive: number[] = [];

    for (const category in chartData) {
        if (chartData[category]) {
            keys.push(chartData[category].categoryName);
            totalTrips.push(chartData[category].totalTrips);
            totalTripsPerc.push(chartData[category].totalTripsPercentage);
            unproductive.push(chartData[category].unproductiveTrips);
        }
    }
    return [
        getPlotObj('Total Trips', keys, totalTrips, COLORS.primary),
        getPlotObj('%of Total Trips', keys, totalTripsPerc, COLORS.secondary, 'scatter', 'y2'),
        getPlotObj('%Unproductive Trips', keys, unproductive, COLORS.success, 'scatter', 'y2'),
    ];
}

export const ContentChart: React.FunctionComponent<ContentChartProps> = ({ chartData }) => {
    if (!chartData || !Object.keys(chartData).length) {
        return (<p>No Chart data available!</p>);
    }

    const charts = constructChartData(chartData);

    // https://plotly.com/javascript/reference/#layout-yaxis
    const layout = {
        xaxis: {
            color: COLORS.text_on_bg,
        },
        yaxis: {
            color: COLORS.text_on_bg,
        },
        yaxis2: {
            color: COLORS.text_on_bg,
            overlaying: 'y',
            side: 'right'
        },
        width: '100%',
        height: '100%',
        hovermode: 'closest',
        margin: { t: 8 },
        legend: {
            orientation: 'h'
        },
        autosize: true,
        paper_bgcolor: COLORS.bg_light,
        plot_bgcolor: 'transparent',
        font: {
            color: COLORS.text_on_bg,
        },
        coloraxis: {
            cauto: false,
        }
    };

    const config = {
        displaylogo: false,
        displayModeBar: false,
    };

    return (
        <Plot
            style={{
                backgroundColor: 'transparent',
            }}
            data={charts}
            layout={layout}
            config={config}
        />
    );
};

export default ContentChart;