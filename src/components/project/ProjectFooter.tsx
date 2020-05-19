import React from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '@material-ui/core';

const PROGRESS_BAR_ELEMENTS = ['Import', 'Exploratory Analysis', 'Bivariate Analysis', 'pre-processing', 'Model development'];

interface ProjectFooterProps {
    activePage: number;
    disableNext: boolean;
    onNext: () => void;
    onPrevious: () => void;
    onGoToPage: (pageIndex: number) => void;
}

export const ProjectFooter: React.FunctionComponent<ProjectFooterProps> = ({
    activePage,
    onNext,
    onPrevious,
    onGoToPage,
    disableNext,
}) => (
    <div className="project-footerContainer">
        { activePage > 0 ? (
            <Button
                className="project-previoustButton"
                variant="contained"
                onClick={onPrevious}
            >
                PREVIOUS
            </Button>
        ): (
            <div />
        )}
        <div className="project-progressBar">
            <ProgressBar
                items={PROGRESS_BAR_ELEMENTS}
                active={activePage}
                onChange={onGoToPage}
            />
        </div>

        <Button
            color="primary"
            variant="contained"
            disabled={disableNext}
            onClick={onNext}
        >
            NEXT
        </Button>

    </div>
);

export default ProjectFooter;