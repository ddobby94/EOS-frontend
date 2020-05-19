import React from 'react';
import { EnhancedTableToolbarProps } from "../_types/DataTable";
import { Toolbar, Button } from "@material-ui/core";
import '../_styles/DataTable.scss';

// const useToolbarStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             paddingLeft: theme.spacing(2),
//             paddingRight: theme.spacing(1),
//         },
//         highlight: theme.palette.type === 'light' ? {
//                 color: theme.palette.secondary.main,
//                 backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//             } : {
//                 color: theme.palette.text.primary,
//                 backgroundColor: theme.palette.secondary.dark,
//             },
//         title: {
//             flex: '1 1 100%',
//         },
//     }),
// );

export const EnhancedTableToolbar: React.FunctionComponent<EnhancedTableToolbarProps> = ({ selected, onExportSelected, targetName }) => {
    const numSelected = selected.length;

    return (
        <Toolbar>
            {!!numSelected && (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onExportSelected}
                >
                    EXPORT {numSelected} ITEM
                </Button>
            )}
            <div className="toolbar-targetChip">
                <p>TARGET:</p>
                <strong>{!!targetName ? targetName : '-'}</strong>
            </div>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;