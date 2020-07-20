import { makeStyles, createStyles } from "@material-ui/core";
import { COLORS, METRICS } from "./styles";

export const FilterPopUpUseStyles = makeStyles(() => ({
    root: {
        '& .MuiFormControl-root': {
            backgroundColor: COLORS.bg_light,
        },
    },
    slider: {
        '& .MuiSlider-rail': {
            backgroundColor: COLORS.text_on_bg,
        },
        '& .MuiSlider-track': {
            backgroundColor: COLORS.primary,
        },
        '& .MuiSlider-thumb': {
            backgroundColor: COLORS.primary,
        },
    },
}));

export const TableDropDownMenuOverride = (color) => makeStyles(() => ({
    outlined: {
        backgroundColor: 'transparent',
        width: '120px',
        fontSize: '1em',
        // fontWeight: '300',
        padding: METRICS.smallest_spacing,
        margin: METRICS.tiny_spacing,
    },
    root: {
        // backgroundColor: transparentColor(color),
        margin: 0,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
                borderWidth: '0px',
                '&:focus': {
                    borderColor: 'transparent',
                }
            },
            '&[aria-disabled=true]': {
                cursor: 'not-allowed',
            },
            '&[aria-disabled]': {
                cursor: 'not-allowed',
            }
        },
    }
}));

export const DataTableOverride = makeStyles(() =>
    createStyles({
        table: {
            minWidth: 750,
        },
    }),
);
