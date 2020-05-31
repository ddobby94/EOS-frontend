import React from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { Button, Icon } from '@material-ui/core';
import { setSuffixClassName } from '../../utils/stylingHelpers';

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
        <Button
            className={setSuffixClassName(activePage === 0, 'project-previousButton', '_hidden')}
            variant="contained"
            onClick={onPrevious}
        >
            <Icon
                className="fa fa-caret-left project-previousPic"
            />
            <p>PREVIOUS</p>
        </Button>
        <div className="project-progressBar project-nextPic">
            <ProgressBar
                items={PROGRESS_BAR_ELEMENTS}
                active={activePage}
                onChange={onGoToPage}
            />
        </div>

        <Button
            className="project-nextButton"
            color="primary"
            variant="contained"
            disabled={disableNext}
            onClick={onNext}
        >
            NEXT
            <Icon
                className="fa fa-caret-right project-nextPic"
            />
        </Button>

    </div>
);

export default ProjectFooter;