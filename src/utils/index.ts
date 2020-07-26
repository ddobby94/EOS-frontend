import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

type DelayadedUnMounting = (time?: number) => [string, (isNext?: boolean) => void, (isNext?: boolean) => void];

export const MOUNTING_STATES = {
    MOUNTING_NEXT: 'MOUNTING_NEXT',
    MOUNTING_PREVIOUS: 'MOUNTING_PREVIOUS',
    MOUNTED: 'MOUNTED',
    UNMOUNTING_NEXT: 'UNMOUNTING_NEXT',
    UNMOUNTING_PREVIOUS: 'UNMOUNTING_PREVIOUS',
    UNMOUNTED: 'UNMOUNTED',
};

export const useDelayedUnmounting: DelayadedUnMounting = (time = 1600) => {
    const [state, setState] = useState(MOUNTING_STATES.MOUNTED);

    const show = (isNext = true) => {
        if (state === MOUNTING_STATES.UNMOUNTING_PREVIOUS || state === MOUNTING_STATES.UNMOUNTING_NEXT) {
            return;
        }
        setState(isNext ? MOUNTING_STATES.MOUNTING_NEXT : MOUNTING_STATES.MOUNTING_PREVIOUS);
    };

    const hide = (isNext = true) => {
        if (state === MOUNTING_STATES.MOUNTING_NEXT || state === MOUNTING_STATES.MOUNTING_PREVIOUS) {
            return;
        }
        setState(isNext ? MOUNTING_STATES.UNMOUNTING_NEXT : MOUNTING_STATES.UNMOUNTING_PREVIOUS);
    };

    useEffect(() => {
        let timeoutId;
        if (state === MOUNTING_STATES.MOUNTING_NEXT || state === MOUNTING_STATES.MOUNTING_PREVIOUS) {
            timeoutId = setTimeout(() => {
                setState(MOUNTING_STATES.MOUNTED);
            }, time);
        } else if (state === MOUNTING_STATES.UNMOUNTING_PREVIOUS || state === MOUNTING_STATES.UNMOUNTING_NEXT) {
            timeoutId = setTimeout(() => {
                setState(MOUNTING_STATES.UNMOUNTED);
            }, time);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [state, time]);

    return [state, show, hide];
}

export const PROJECT_STEP_PARAM = 'step';