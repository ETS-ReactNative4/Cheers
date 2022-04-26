import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Grid } from "@material-ui/core";
import Post from "./Post";

//Posts component
const Posts = (props) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Get data
            const res = await getUserFromDatabase();
            setUser(res[0]);
        }
        if (localStorage.token) {
            fetchData();
        }
    }, []);

    props.posts.sort((a, b) => a.post_date < b.post_date ? 1 : -1);

    return props.posts.map((post, index) => (
        <Grid key={index} item md={4} sm={6} xs={12} >
            <Post
                currentUser={user}
                post_id={post.post_id}
                recipe_id={post.recipe_id}
                user={post.user_name}
                title={post.title}
                date={new Date(post.post_date).toDateString()}
                img={`${post.category_name}.jpg`}
                rating={post.star_num}
                category={post.category_name}
                ingredients={post.ingredients}
                instructions={post.instructions}
            // id={post.id}
            />
        </Grid>
    ));
};

async function getUserFromDatabase() {
    const res = await axios({
        method: "get",
        url: "/api/auth",
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
}

export default Posts;
