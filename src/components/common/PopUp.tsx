import * as React from 'react';
import '../_styles/common.scss';
import { Icon, Fab, Button } from '@material-ui/core';


export interface PopUpProperties {
    title: string;
    description?: string;
    positiveButtonText?: string;
    onClose: () => void;
    onApprove?: () => void;
    secondaryButtonComponent?: React.ReactNode;
}

export const PopUp: React.FunctionComponent<PopUpProperties> = ({
    title,
    description,
    onClose,
    onApprove,
    positiveButtonText,
    children,
    secondaryButtonComponent,
}) => (
    <div
        className="popup-blurredBg"
        onClick={onClose}
    >
        <div
            className="popup-container"
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
            }}
        >
            <div className="popup-titleRow">
                <div className="popup-titleContainer">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <Fab
                    className="popup-closeButton"
                    size="small"
                    aria-label="close"
                    onClick={onClose}
                >
                    <Icon
                        className="fa fa-times"
                    />
                </Fab>
            </div>
            <div className="popup-content">
                {children}
            </div>
            <div
                className="popup-buttonRow"
            >
                {secondaryButtonComponent}
                {positiveButtonText && onApprove && (
                    <Button
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            onApprove();
                        }}
                        className="login-button"
                        color="primary"
                        variant="contained"
                        children={positiveButtonText}
                    />
                )}
            </div>
        </div>
    </div>
);

export default PopUp;
