export interface BaseProjectContentCard {
    setNextButtonAvailability: (available: boolean) => void;
}

export interface ImportPageProps extends BaseProjectContentCard {
    onProjectNameChange: (string) => void;
    projectTitle: string;
    selectedFile?: File;
    setSelectedFile: (f?: File) => void;
}

export interface ExpolratoryProps extends BaseProjectContentCard {
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
