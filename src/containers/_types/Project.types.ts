import { Variable } from "../../components/_types/DataTable";

export interface BaseProjectContentCard {
    setNextButtonAvailability: (available: boolean) => void;
}

export interface ImportPageProps extends BaseProjectContentCard {
    onProjectNameChange: (string) => void;
    projectTitle: string;
    selectedFile?: File;
    setSelectedFile: (f?: File) => void;
    uploadSelectedFile: (f?: File) => void;
}

export interface ExpolratoryProps extends BaseProjectContentCard {
    targetVariable?: Variable;
    setTargetVariable: (v?: Variable) => void;
}

export interface ProjectContainerProps {
    projectTitleRedux: string;
    setProjectTitleRedux: (s: string) => void;
}

export interface FilterRangeData {
    min: number;
    max: number;
    inclusive: boolean;
}

export interface FilterSelectedValuesData {
    includingValues?: string[];
    excludingValues?: string[];
}

export interface Filter {
    type: 'range' | 'values';
    name: string;
    variable: string;
    data: FilterRangeData | FilterSelectedValuesData;
}


type VersionMetaData = {
    '0': number;
    '1': number;
    holdout: number;
    IVbins: number;
};

export class Version {
    constructor() {
        this.created = new Date();
    }

    versionCount: number = 0;
    created: Date;
    activeFilters: Filter[] = [];
    meta: VersionMetaData = {
        '0': 0,
        '1': 0,
        holdout: 0.2,
        IVbins: 20,
    };
}

export interface SingleProject {
    selectedFile?: File,
    meta: {
        datasetName: string;
        title: string;
        totalRecords?: number;
        numberOfVariables?: number;
        currentVersion?: Version;
        targetVariable?: Variable;
    },
    filters: Filter[];
    variables: Variable[];
    versions: Version[];
}
