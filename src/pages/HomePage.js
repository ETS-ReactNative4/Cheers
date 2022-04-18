import React from 'react';
import Banner from '../components/Banner/Banner';
import { homeBanner } from '../Data/bannerData';
import { Grid } from "@material-ui/core";
import Announcement from '../components/ForHome/Announcement';
import styled from "styled-components";
import PostLayout from '../components/ForHome/PostLayout';
import { announcementData } from '../Data/announcementData';


function HomePage(prop) {
    return (
        <>
            <Banner {...homeBanner} />
            <AnnouncementContainer>
                <Announcement
                    name={announcementData.name}
                    topic={announcementData.topic}
                    message={announcementData.message}
                    date={announcementData.date}
                />
            </AnnouncementContainer>
            <PostLayout />

        </>
    );
}

const AnnouncementContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`



export default HomePage;