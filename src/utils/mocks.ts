import { ExploratoryObj } from "../components/_types/DataTable";

export const EXPLORATORY_ANALYSIS_KEYS = [
    'name',
    'label',
    'role',
    'type',
    'validObs',
    'missingValues',
    'missingValuessPercentage',
    'uniqueValues',
    'min',
    'max',
    'mean',
    'stdDev',
    'range',
    'mode',
    'P1',
    'P5',
    'P10',
    'Q1',
    'median',
    'Q3',
    'P90',
    'P95',
    'P99',
    'autoIgnored',
];

export const EXPLORATORY_ANALYSIS_HEADERS =  ['Name', 'Role', 'Type', '%Missing values', 'Unique values', 'Median', 'Mean'];

export const EXPLORATORY_ANALYSIS_DATA = [
    ['CALENDAR_ORDER_TYPE', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,4,,,,,,,,,,,,,,,,true],
    ['DISCO_REASON', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,5,,,,,,,,,,,,,,,,true],
    ['ENV', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,13,,,,,,,,,,,,,,,,true],
    ['FIELD_CALENDAR', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,2,,,,,,,,,,,,,,,,true],
    ['FIRST_APPT_SELECTED', 'Not Available', 'Explanatory', 'Categorical', 316637 ,972 ,0.31,2,,,,,,,,,,,,,,,,true],
    ['MISSED_DUEDT', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,3,,,,,,,,,,,,,,,,true],
    ['PRODUCT_CLASS', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,3,,,,,,,,,,,,,,,,true],
    ['REFER_REASON_GRP_L1', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,8,,,,,,,,,,,,,,,,true],
    ['REFER_REASON_L1', 'Not Available', 'Explanatory', 'Categorical', 17546 ,300063 ,94.48,17,,,,,,,,,,,,,,,,true],
    ['RESPONSE_CODE_L1', 'Not Available', 'Explanatory', 'Categorical', 12980 ,304629 ,95.91,5,,,,,,,,,,,,,,,,true],
    ['TRIP_B4_DUEDT', 'Not Available', 'Explanatory', 'Categorical', 317609 ,0 ,0,3,,,,,,,,,,,,,,,,true],
    ['BONDED', 'Not Available', 'Ignore', 'Categorical', 317592 ,17 ,0.01,2,,,,,,,,,,,,,,,,false],
    ['ACTION_CNT', 'Not Available', 'Explanatory', 'Continuous', 317347 ,262 ,0.08,19,1,33,1.19,0.69,32,1,1,1,1,1,1,1,2,3,4,false],
    ['APPT_LENGTH_HRS', 'Not Available', 'Explanatory', 'Continuous', 317609 ,0 ,0,16,0,16,3.89,1.18,16,4,1,1,4,4,4,4,4,4,11,true],
    ['CALL_COUNT_L1', 'Not Available', 'Explanatory', 'Continuous', 17587 ,300022 ,94.46,21,1,29,2.26,1.68,28,1,1,1,1,1,2,3,4,5,9,true],
    ['CALL_ID', 'Not Available', 'Explanatory', 'Continuous', 317609 ,0 ,0,317609,82443036,84947367,83437511.91,547710.52,2504331,82443036,82472194.08,82568569.4,82684426.8,82987345,83447200,83897012,84179384.4,84292022.2,84433379.92,true],
    ['DURATION', 'Not Available', 'Explanatory', 'Continuous', 317609 ,0 ,0,22,20,255,122.41,41.78,235,120,30,60,60,90,120,165,180,180,225,true],
    ['EVENT_RDIS', 'Not Available', 'Explanatory', 'Continuous', 317347 ,262 ,0.08,10,0,11,0.04,0.23,11,0,0,0,0,0,0,0,0,0,1,false],
    ['EVENT_REFSSO', 'Not Available', 'Explanatory', 'Continuous', 317347 ,262 ,0.08,10,0,12,0.07,0.3,12,0,0,0,0,0,0,0,0,1,1,true],
    ['EVENT_RFRRSN', 'Not Available', 'Explanatory', 'Continuous', 317347 ,262 ,0.08,18,0,20,0.14,0.5,20,0,0,0,0,0,0,0,1,1,2,true],
    ['EVENT_RPTCBR', 'Not Available', 'Explanatory', 'Continuous', 317347 ,262 ,0.08,18,0,18,2.14,1.05,18,2,0,0,1,2,2,3,3,4,5,true],
    ['NUM_PREV_CALL_COUNT', 'Not Available', 'Explanatory', 'Continuous', 317609 ,0 ,0,9,0,8,0.07,0.3,8,0,0,0,0,0,0,0,0,1,1,true],
    ['START_STOP_MINS', 'Not Available', 'Explanatory', 'Continuous', 312852 ,4757 ,1.5,2414,-2,141287,215.04,1815.76,141289,119,5,25,44,83,131,186,247,294,477,true],
    ['START_STOP_MINS_L1', 'Not Available', 'Explanatory', 'Continuous', 15862 ,301747 ,95.01,1391,0,129705,844.61,5175.17,129705,31,3,12,19,35,64,118,254.9,1103,24540.75,true],
    ['TOTAL_EVENT_CNT', 'Not Available', 'Explanatory', 'Continuous', 317609 ,0 ,0,124,0,204,11.72,6.5,204,8,6,7,7,8,10,13,18,24,38,true],
    ['LOG_PREVCALLS', 'log(NUM_PREV_CALL_COUNT)', 'Explanatory', 'Continuous', 317609 ,0 ,0,8,0,2.08,,,2.08,0,0,0,0,0,0,0,0,0,0,true],
    ['NEWVAR', 'sqrt(APPT_LENGTH_HRS)', 'Explanatory', 'Continuous', 317609 ,0 ,0,16,0,4,1.95,0.33,4,2,1,1,2,2,2,2,2,2,3.32,true],
    ['MSOSO', 'Not Available', 'Key', 'Continuous', 317609 ,0 ,0,299493,4488167,75833861,61003828.68,16381051.4,71345694,75396202,4560608.6,39232077.2,40543157,46150005,71160288,75206881,75547369.2,75696275,75807102.92,true],
    ['EVENT_COMP', 'Not Available', 'Explanatory', 'Discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,1,1,1,1,1,1,true],
    ['EVENT_RCWA', 'Not Available', 'Explanatory', 'Discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['EVENT_RNOA', 'Not Available', 'Explanatory', 'Discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['EVENT_RSAV', 'Not Available', 'Explanatory', 'Discrete', 317347 ,262 ,0.08,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['LONGMSG_CANCEL', 'Not Available', 'Explanatory', 'Discrete', 317609 ,0 ,0,2,0,1,,,1,0,0,0,0,0,0,0,0,0,1,true],
    ['MSOSO_FLAG', 'Not Available', 'Explanatory', 'Discrete', 317609 ,0 ,0,2,0,1,,,1,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_CANCEL', 'Not Available', 'Ignore', 'Discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_RHHC', 'Not Available', 'Ignore', 'Discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_RM6SC', 'Not Available', 'Ignore', 'Discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['EVENT_RPRI', 'Not Available', 'Ignore', 'Discrete', 317347 ,262 ,0.08,1,0,0,,,0,0,0,0,0,0,0,0,0,0,0,true],
    ['UNPRODUCTIVE', 'Not Available', 'Target', 'Discrete', 317609 ,0 ,0,2,0,1,,,1,0,0,0,0,0,0,0,1,1,1,true],
];

const transformRowDataToObj = (row) => {
    const o = {};

    const checkForMissingValues = (val) => {
        if (val === undefined) {
            return 'N/A';
        }
        return val;
    }

    EXPLORATORY_ANALYSIS_KEYS.forEach((label, index) => {
        o[label] = checkForMissingValues(row[index]);
    });

    return {...o} as ExploratoryObj;
};

export const EXPLORATORY_ANALYSIS_DATA_OBJECT: ExploratoryObj[] = EXPLORATORY_ANALYSIS_DATA.map((row) => transformRowDataToObj(row));
