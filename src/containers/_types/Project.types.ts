import { Variable } from "../../components/_types/DataTable";
import { ProjectState } from "../../redux/helpers/types";

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

export interface PreProcessingProps extends BaseProjectContentCard {
    projectBaseData: ProjectState['editing']['meta'];
    toggleFilterIsActive: (id: string, isActive: boolean) => void;
    variables: ProjectState['editing']['variables'];
    filters: ProjectState['editing']['filters'];
    activeFiltersList: ProjectState['editing']['filters'];
    targetVariable: ProjectState['editing']['meta']['targetVariable'];
    generateIVsample: (d: generateRequestPayload) => void;
    hasGeneratedFineIV: boolean;
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

export const FILTER_CRITERIAS = {
    LESS: 'LESS', // <
    GREATER: 'GREATER', // >
    LESS_EQUAL: 'LESS_EQUAL', // ≤
    GREATER_EQUAL: 'GREATER_EQUAL', // ≥
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
};

// export interface Filter {
//     id: string;
//     isActive: boolean;
//     type: 'range' | 'values';
//     name: string;
//     variable: Variable;
//     criteria: keyof typeof FILTER_CRITERIAS;
//     criteriaRange?: number;
//     criteriaValues?: string[] | number;
// }

export class Filter {
    id: string;
    isActive: boolean = true;
    type: 'range' | 'values';
    name: string;
    variable: Variable;
    criteria: keyof typeof FILTER_CRITERIAS;
    criteriaRange?: number;
    criteriaValues?: string[];

    generateId = () => `${this.variable.name}_${this.criteria}_${this.criteriaRange || this.criteriaValues?.join('_')}`
    generateName = (name) => `${name}_${this.criteria}`

    constructor({
        type,
        name,
        variable,
        criteria,
        criteriaRange,
        criteriaValues,
    }: {
        type: 'range' | 'values';
        name: string;
        variable: Variable;
        criteria: string;
        criteriaRange?: number;
        criteriaValues?: string[];
    }) {
        this.type = type;
        this.variable = variable;
        this.criteria = criteria as keyof typeof FILTER_CRITERIAS;
        this.criteriaRange = criteriaRange;
        this.criteriaValues = criteriaValues;
        this.name = this.generateName(name);
        this.id = this.generateId();
    }
}

export type VersionMetaData = {
    '0': number;
    '1': number;
    holdout: number;
    IVbins: number;
};

export interface PreLoadedVersion {
    id: number;
    created: Date;
    activeFilters: Filter[];
    meta: VersionMetaData;
};

export interface SingleProject {
    selectedFile?: File,
    meta: {
        datasetName: string;
        title: string;
        totalRecords?: number;
        numberOfVariables?: number;
        currentVersion: number;
        targetVariable?: Variable;
    },
    filters: Filter[];
    variables: Variable[];
    versions: PreLoadedVersion[];
}

export interface IVresultObject {
    variableId: string;
    role: string;
    type: string;
    IVvalue: number;
}

export type IVresults = IVresultObject[];

export type generateRequestPayload = [Filter[], VersionMetaData, Variable];
