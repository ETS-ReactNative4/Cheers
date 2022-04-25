import React from 'react';
import ReportsPage from '../components/ForReports/ReportsPage';
import Banner from '../components/Banner/Banner';
import { reportsBanner } from '../Data/bannerData';


function Reports() {
    return (
        <>
            <Banner {...reportsBanner} />
            <ReportsPage />
        </>
    );
}

export default Reports;