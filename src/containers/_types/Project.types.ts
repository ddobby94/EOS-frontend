

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
