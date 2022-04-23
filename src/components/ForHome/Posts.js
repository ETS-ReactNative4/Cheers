import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post";

//Posts component
const Posts = (props) => {
    console.log(props.posts)
    return props.posts.map((post) => (
        <Grid item md={4} sm={6} xs={12}>

            <Post
                user={post.user}
                title={post.title}
                date={post.date}
                img={post.img}
                rating={post.rating}
                ingredients={post.ingredients}
                instructions={post.instructions}
            // id={post.id}
            />
        </Grid>
    ));
};

export default Posts;
