/* eslint-disable max-len */
/* eslint-disable no-sparse-arrays */
import { ExploratoryObj, ExpChartData } from '../src/components/_types/DataTable';
import { EXPLORATORY_ANALYSIS_KEYS, EMPTY_DATA } from '../src/utils/DataTableUtils';
import { SimpleObject } from '../src/types/commonTypes';

const EXPLORATORY_CHART_MOCK: SimpleObject<ExpChartData> = {
    APPT_LENGTH_HRS: {
        '<=1': {
            categoryName: '<=1',
            totalTrips: 18699,
            totalTripsPercentage: 0.0558,
            unproductiveTrips: 0.033,
        },
        '1-3': {
            categoryName: '1-3',
            totalTrips: 140238,
            totalTripsPercentage: 0.4184,
            unproductiveTrips: 0.2,
        },
        '4': {
            categoryName: '4',
            totalTrips: 150618,
            totalTripsPercentage: 0.4494,
            unproductiveTrips: 0.15,
        },
        '5-9': {
            categoryName: '5-9',
            totalTrips: 19393,
            totalTripsPercentage: 0.0579,
            unproductiveTrips: 0.334,
        },
        '>9': {
            categoryName: '>9',
            totalTrips: 6195,
            totalTripsPercentage: 0.0185,
            unproductiveTrips: 0.549,
        },
    },
    BONDED: {
        'N': {
            categoryName: 'N',
            totalTrips: 269143,
            totalTripsPercentage: 0.8031,
            unproductiveTrips: 0.158,
        },
        'Y': {
            categoryName: 'Y',
            totalTrips: 65959,
            totalTripsPercentage: 0.1968,
            unproductiveTrips: 0.28,
        },
        'Missing Value': {
            categoryName: 'Missing Value',
            totalTrips: 41,
            totalTripsPercentage: 0.0001,
            unproductiveTrips: 0.341,
        },
    },
    FIRST_APPT_SELECTED: {
        'N': {
            categoryName: 'N',
            totalTrips: 185348,
            totalTripsPercentage: 0.553,
            unproductiveTrips: 0.239,
        },
        'Y': {
            categoryName: 'Y',
            totalTrips: 144977,
            totalTripsPercentage: 0.4326,
            unproductiveTrips: 0.109,
        },
        'Missing Value': {
            categoryName: 'Missing Value',
            totalTrips: 4818,
            totalTripsPercentage: 0.0144,
            unproductiveTrips: 0.208,
        },
    },
    DISCO_REASON: {
        'CHANGE': {
            categoryName: 'CHANGE',
            totalTrips: 53223,
            totalTripsPercentage: 0.1588,
            unproductiveTrips: 0.063,
        },
        'CUSTOMER': {
            categoryName: 'CUSTOMER',
            totalTrips: 12857,
            totalTripsPercentage: 0.0384,
            unproductiveTrips: 0.946,
        },
        'FRONTIER': {
            categoryName: 'FRONTIER',
            totalTrips: 29245,
            totalTripsPercentage: 0.0873,
            unproductiveTrips: 0.744,
        },
        'MOVE': {
            categoryName: 'MOVE',
            totalTrips: 340,
            totalTripsPercentage: 0.001,
            unproductiveTrips: 0.074,
        },
        'OTHER': {
            categoryName: 'OTHER',
            totalTrips: 239478,
            totalTripsPercentage: 0.7146,
            unproductiveTrips: 0.099,
        },
    },
    DURATION: {
        '<=60': {
            categoryName: '<=60',
            totalTrips: 45882,
            totalTripsPercentage: 0.1369,
            unproductiveTrips: 0.12,
        },
        '61-150': {
            categoryName: '61-150',
            totalTrips: 192396,
            totalTripsPercentage: 0.5741,
            unproductiveTrips: 0.169,
        },
        '>150': {
            categoryName: '>150',
            totalTrips: 96865,
            totalTripsPercentage: 0.289,
            unproductiveTrips: 0.238,
        },
    },
    PRODUCT_CLASS: {
        'Copper': {
            categoryName: 'Copper',
            totalTrips: 178112,
            totalTripsPercentage: 0.5315,
            unproductiveTrips: 0.226,
        },
        'Fiber': {
            categoryName: 'Fiber',
            totalTrips: 156745,
            totalTripsPercentage: 0.4677,
            unproductiveTrips: 0.132,
        },
        'Unknown': {
            categoryName: 'Unknown',
            totalTrips: 245,
            totalTripsPercentage: 0.0007,
            unproductiveTrips: 0.686,
        },
        'Missing Value': {
            categoryName: 'Missing Value',
            totalTrips: 41,
            totalTripsPercentage: 0.0001,
            unproductiveTrips: 0.341,
        },
    },
    START_STOP_MINS: {
        '<=58': {
            categoryName: '<=58',
            totalTrips: 51140,
            totalTripsPercentage: 0.15259158,
            unproductiveTrips: 0.488463043,
        },
        '59-71': {
            categoryName: '59-71',
            totalTrips: 16996,
            totalTripsPercentage: 0.050712681,
            unproductiveTrips: 0.314721111,
        },
        '72-135': {
            categoryName: '72-135',
            totalTrips: 103787,
            totalTripsPercentage: 0.309679749,
            unproductiveTrips: 0.141327912,
        },
        '136-276': {
            categoryName: '136-276',
            totalTrips: 135141,
            totalTripsPercentage: 0.403233843,
            unproductiveTrips: 0.049252262,
        },
        '>276': {
            categoryName: '>276',
            totalTrips: 21594,
            totalTripsPercentage: 0.064432198,
            unproductiveTrips: 0.142446976,
        },
        'Missing Value': {
            categoryName: 'Missing Value',
            totalTrips: 6485,
            totalTripsPercentage: 0.019349949,
            unproductiveTrips: 0.984271396,
        },
    },
    MISSED_DUETDT: {
        'N': {
            categoryName: 'N',
            totalTrips: 281614,
            totalTripsPercentage: 0.840280119,
            unproductiveTrips: 0.069,
        },
        'Y': {
            categoryName: 'Y',
            totalTrips: 53529,
            totalTripsPercentage: 0.159719881,
            unproductiveTrips: 0.779,
        },
    },
    CALL_COUNT_L1: {
        '<2': {
            categoryName: '<2',
            totalTrips: 48027,
            totalTripsPercentage: 0.143303008,
            unproductiveTrips: 0.554188269,
        },
        '>=2': {
            categoryName: '>=2',
            totalTrips: 285012,
            totalTripsPercentage: 0.850419075,
            unproductiveTrips: 0.114819727,
        },
        'Missing Value': {
            categoryName: 'Missing Value',
            totalTrips: 2104,
            totalTripsPercentage: 0.006277917,
            unproductiveTrips: 0.841730038,
        },
    },
    RESPONSE_CODE_L1: {
        'CUSTOMER WANTS CALL BACK': {
            categoryName: 'CUSTOMER WANTS CALL BACK',
            totalTrips: 351,
            totalTripsPercentage: 0.001047314,
            unproductiveTrips: 0.378917379,
        },
        'INVALID CBR': {
            categoryName: 'INVALID CBR',
            totalTrips: 4033,
            totalTripsPercentage: 0.012033669,
            unproductiveTrips: 0.696999752,
        },
        'NO ANSWER, LEFT VOICEMAIL': {
            categoryName: 'NO ANSWER, LEFT VOICEMAIL',
            totalTrips: 20351,
            totalTripsPercentage: 0.060723333,
            unproductiveTrips: 0.567441403,
        },
        'NO ANSWER, NO VOICEMAIL': {
            categoryName: 'NO ANSWER, NO VOICEMAIL',
            totalTrips: 35838,
            totalTripsPercentage: 0.106933458,
            unproductiveTrips: 0.50859423,
        },
        'REACHED CUSTOMER': {
            categoryName: 'REACHED CUSTOMER',
            totalTrips: 33901,
            totalTripsPercentage: 0.101153836,
            unproductiveTrips: 0.418129259,
        },
        'N/A': {
            categoryName: 'N/A',
            totalTrips: 238565,
            totalTripsPercentage: 0.711830472,
            unproductiveTrips: 0.05217446,
        },
        'Missing Value': {
            categoryName: 'Missing Value',
            totalTrips: 2104,
            totalTripsPercentage: 0.006277917,
            unproductiveTrips: 0.841730038,
        },
    },
}

export const EXPLORATORY_ANALYSIS_DATA = [
    ['CALENDAR_ORDER_TYPE', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,4,,,,,,,,,,,,,,,,true],
    ['DISCO_REASON', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,5,,,,,,,,,,,,,,,,true],
    ['ENV', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,13,,,,,,,,,,,,,,,,true],
    ['FIELD_CALENDAR', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,2,,,,,,,,,,,,,,,,true],
    ['FIRST_APPT_SELECTED', 'Not Available', 'predictor', 'categorical', 316637 ,972 ,0.31,2,,,,,,,,,,,,,,,,true],
    ['MISSED_DUEDT', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,3,,,,,,,,,,,,,,,,true],
    ['PRODUCT_CLASS', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,3,,,,,,,,,,,,,,,,true],
    ['REFER_REASON_GRP_L1', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,8,,,,,,,,,,,,,,,,true],
    ['REFER_REASON_L1', 'Not Available', 'predictor', 'categorical', 17546 ,300063 ,94.48,17,,,,,,,,,,,,,,,,true],
    ['RESPONSE_CODE_L1', 'Not Available', 'predictor', 'categorical', 12980 ,304629 ,95.91,5,,,,,,,,,,,,,,,,true],
    ['TRIP_B4_DUEDT', 'Not Available', 'predictor', 'categorical', 317609 ,0 ,0,3,,,,,,,,,,,,,,,,true],
    ['BONDED', 'Not Available', 'ignore', 'categorical', 317592 ,17 ,0.01,2,,,,,,,,,,,,,,,,false],
    ['ACTION_CNT', 'Not Available', 'predictor', 'continuous', 317347 ,262 ,0.08,19,1,33,1.19,0.69,32,1,1,1,1,1,1,1,2,3,4,false],
    ['APPT_LENGTH_HRS', 'Not Available', 'predictor', 'continuous', 317609 ,0 ,0,16,0,16,3.89,1.18,16,4,1,1,4,4,4,4,4,4,11,true],
    ['CALL_COUNT_L1', 'Not Available', 'predictor', 'continuous', 17587 ,300022 ,94.46,21,1,29,2.26,1.68,28,1,1,1,1,1,2,3,4,5,9,true],
    ['CALL_ID', 'Not Available', 'predictor', 'continuous', 317609 ,0 ,0,317609,82443036,84947367,83437511.91,547710.52,2504331,82443036,82472194.08,82568569.4,82684426.8,82987345,83447200,83897012,84179384.4,84292022.2,84433379.92,true],
    ['DURATION', 'Not Available', 'predictor', 'continuous', 317609 ,0 ,0,22,20,255,122.41,41.78,235,120,30,60,60,90,120,165,180,180,225,true],
    ['EVENT_RDIS', 'Not Available', 'predictor', 'continuous', 317347 ,262 ,0.08,10,0,11,0.04,0.23,11,0,0,0,0,0,0,0,0,0,1,false],
    ['EVENT_REFSSO', 'Not Available', 'predictor', 'continuous', 317347 ,262 ,0.08,10,0,12,0.07,0.3,12,0,0,0,0,0,0,0,0,1,1,true],
    ['EVENT_RFRRSN', 'Not Available', 'predictor', 'continuous', 317347 ,262 ,0.08,18,0,20,0.14,0.5,20,0,0,0,0,0,0,0,1,1,2,true],
    ['EVENT_RPTCBR', 'Not Available', 'predictor', 'continuous', 317347 ,262 ,0.08,18,0,18,2.14,1.05,18,2,0,0,1,2,2,3,3,4,5,true],
    ['NUM_PREV_CALL_COUNT', 'Not Available', 'predictor', 'continuous', 317609 ,0 ,0,9,0,8,0.07,0.3,8,0,0,0,0,0,0,0,0,1,1,true],
    ['START_STOP_MINS', 'Not Available', 'predictor', 'continuous', 312852 ,4757 ,1.5,2414,-2,141287,215.04,1815.76,141289,119,5,25,44,83,131,186,247,294,477,true],
    ['START_STOP_MINS_L1', 'Not Available', 'predictor', 'continuous', 15862 ,301747 ,95.01,1391,0,129705,844.61,5175.17,129705,31,3,12,19,35,64,118,254.9,1103,24540.75,true],
    ['TOTAL_EVENT_CNT', 'Not Available', 'predictor', 'continuous', 317609 ,0 ,0,124,0,204,11.72,6.5,204,8,6,7,7,8,10,13,18,24,38,true],
    ['LOG_PREVCALLS', 'log(NUM_PREV_CALL_COUNT)', 'predictor', 'continuous', 317609 ,0 ,0,8,0,2.08,,,2.08,0,0,0,0,0,0,0,0,0,0,true],
    ['NEWVAR', 'sqrt(APPT_LENGTH_HRS)', 'predictor', 'continuous', 317609 ,0 ,0,16,0,4,1.95,0.33,4,2,1,1,2,2,2,2,2,2,3.32,true],
    ['MSOSO', 'Not Available', 'predictor', 'continuous', 317609 ,0 ,0,299493,4488167,75833861,61003828.68,16381051.4,71345694,75396202,4560608.6,39232077.2,40543157,46150005,71160288,75206881,75547369.2,75696275,75807102.92,true],
    ['EVENT_COMP', 'Not Available', 'predictor', 'discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,1,1,1,1,1,1,true],
    ['EVENT_RCWA', 'Not Available', 'predictor', 'discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['EVENT_RNOA', 'Not Available', 'predictor', 'discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['EVENT_RSAV', 'Not Available', 'predictor', 'discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['LONGMSG_CANCEL', 'Not Available', 'predictor', 'discrete', 317609 ,0 ,0,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['MSOSO_FLAG', 'Not Available', 'predictor', 'discrete', 317609 ,0 ,0,2,0,1,,,1,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_CANCEL', 'Not Available', 'ignore', 'discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_RHHC', 'Not Available', 'ignore', 'discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_RM6SC', 'Not Available', 'ignore', 'discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_RPRI', 'Not Available', 'ignore', 'discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['UNPRODUCTIVE', 'Not Available', 'ignore', 'discrete', 317609 ,0 ,0,2,0,1,,,1,0,0,0,0,0,0,0,1,1,1,true],
];

const calcIQR = (o: ExploratoryObj) => o.Q3 - o.Q1;
const calcCV = (o: ExploratoryObj) => (o.mean / o.stdDev) || EMPTY_DATA;

const checkForMissingValues = (val) => {
    if (val === undefined) {
        return EMPTY_DATA;
    }
    return val;
}

const transformRowDataToObj = (row) => {
    const o: SimpleObject = {};


    EXPLORATORY_ANALYSIS_KEYS.forEach((label, index) => {
        o[label] = checkForMissingValues(row[index]);
    });

    if (!!EXPLORATORY_CHART_MOCK[o.name]) {
        o.chartData = EXPLORATORY_CHART_MOCK[o.name];
    }

    o.IQR = calcIQR(o as ExploratoryObj);
    o.CV = calcCV(o as ExploratoryObj);

    return { ...o } as ExploratoryObj;
};

export const EXPLORATORY_ANALYSIS_DATA_OBJECT: ExploratoryObj[] = EXPLORATORY_ANALYSIS_DATA.map((row) => transformRowDataToObj(row));
