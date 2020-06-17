import React, { useState, useEffect } from "react";
import { COLORS, METRICS } from "../../styles/styles";
import { Icon } from "@material-ui/core";

interface ErrorCardProps {
    errorMsg?: string;
};

export const ErrorCard: React.FunctionComponent<ErrorCardProps> = ({ errorMsg, ...props }) => {
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
        setShow(true);
    }, [errorMsg])

    if (!errorMsg || !show) {
        return (<></>);
    }

    return (
        <div
            onClick={() => (setShow(false))}
            style={{
                width: '100%',
                height: METRICS.medium_spacing,
                padding: METRICS.small_spacing,
                margin: METRICS.small_spacing,
                backgroundColor: COLORS.makeTransparent(COLORS.danger, 60),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
            }}
            {...props}
        >
            <p
                style={{
                    margin: 0,
                }}
            >
                {errorMsg}
            </p>
            <Icon
                className="fa fa-times"
            />
        </div>
    );
}

export default (ErrorCard);