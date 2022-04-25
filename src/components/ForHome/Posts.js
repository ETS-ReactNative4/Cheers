import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post";

//Posts component
const Posts = (props) => {
    console.log(props.posts)
    return props.posts.map((post, index) => (
        <Grid key={index} item md={4} sm={6} xs={12}>

            <Post
                recipe_id={post.recipe_id}
                user={post.user_name}
                title={post.title}
                date={new Date(post.post_date).toDateString()}
                img={`${post.category_name}.jpg`}
                rating={post.star_num}
                category={post.category_name}
                ingredients={post.ingredients}
                instructions={post.instructions}
            />
        </Grid>
    ));
};

export default Posts;
