import React from 'react';
import { EnhancedTableToolbarProps } from "../_types/DataTable";
import { Toolbar, Button } from "@material-ui/core";
import '../_styles/DataTable.scss';
import { Chip } from '../common/Chip';
import { COLORS } from '../../styles/styles';

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
            <Chip
                title="TARGET"
                description={targetName || 'Not selected'}
                color={COLORS.primary}
            />
            <Chip
                title="#VARIABLES"
                description="39"
                color={COLORS.ocean}
            />
            <Chip
                title="#Records"
                description="427,020"
                color={COLORS.orange}
            />
        </Toolbar>
    );
};

export default EnhancedTableToolbar;