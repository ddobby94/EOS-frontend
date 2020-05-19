import React from 'react';
import { ExpolratoryProps } from '../_types/Project.types';
import ContentCard from '../../components/common/ContentCard';
import EnhancedTable from '../../components/DataTable/DataTable';

export const Exploratory: React.FunctionComponent<ExpolratoryProps> = ({ setNextButtonAvailability }) => {
    console.log(setNextButtonAvailability);

    return (
        <ContentCard
            title="EXPLORATORY ANALYSIS"
        >
            <EnhancedTable />
        </ContentCard>
    );
};


export default Exploratory;
