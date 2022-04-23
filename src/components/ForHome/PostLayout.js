import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Filter from "./Filter";
import Posts from './Posts';
import { filterData } from "../../Data/filterData";
import axios from 'axios';
import posts from '../../Data/testPosts';



const PostLayout = () => {
    //   const [researchPosts, setResearchPosts] = useState([]);
    //   useEffect(async () => {
    //     const res = await getResearchPostsFromDatabase();
    //     setResearchPosts(res);
    //   }, []);

    return (
        <>
            <Grid container>
                <Grid item md={2} xs={12} sm={2}>
                    <Filter filters={filterData} createLink={'/create'} />
                </Grid>
                <Grid container item md={10} xs={12} sm={10}>
                    <Posts posts={posts} />
                </Grid>
            </Grid>
        </>
    );
};

async function getResearchPostsFromDatabase() {
    // const res = await axios({
    //     method: 'get',
    //     url: "/api/research",
    //     headers: { "Content-Type": "application/json" },
    // });
    // return res.data;
}

async function filterResearchPostsFromDatabase(category) {
    // let body = { category: "" };
    // if (category) {
    //     body.category = category;
    // }
    // const res = await axios({
    //     method: 'post',
    //     url: "/api/research/category",
    //     headers: { "Content-Type": "application/json" },
    //     data: body
    // });
    // return res.data;
}

export default PostLayout;
