

export interface BaseProjectContentCard {
    setNextButtonAvailability: (available: boolean) => void;
}

export interface ImportPageProps extends BaseProjectContentCard {
    onProjectNameChange: (string) => void;
    projectTitle: string;
}

export interface ExpolratoryProps extends BaseProjectContentCard {
}