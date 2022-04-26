import { Fragment, useEffect, useState } from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
// import LinesEllipsis from 'react-lines-ellipsis'
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Delete from '../Delete/Delete.js';

const useStyles = makeStyles({
    container: {
        minHeight: "36rem",
        maxHeight: "36rem",
        marginLeft: "0.9rem",
        marginTop: "1rem",
        borderRadius: 10,
        border: "2px solid #3a3a3a",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgb(255, 111, 97, 0.8)",
        boxShadow: "3px 3px 5px rgba(0,0,0, .4)",
        "& > *": {
            padding: "2px 12px",
        },

    },
    image: {
        width: "100%",
        height: "20rem",
        objectFit: "cover",
        borderRadius: "25px",
        marginTop: "0.4rem"
    },
    text: {
        color: "#000",
        fontSize: 12,
    },
    heading: {
        fontSize: 18,

        fontWeight: 600,
        fontFamily: "Poppins",
        textAlign: "center"
    },
    detail: {
        fontSize: 14,
        fontFamily: "Poppins",
        wordBreak: "break-word",
        width: "95%",
        //height: "10rem"
    },
    buttonContainer: {
        marginTop: "1.2rem",
        marginLeft: "1rem"
    },
    button: {
        marginRight: "0.2rem"
    }
});

//Individual Post component

const Post = ({ title, user, rating, category, instructions, recipe_id, post_id, img, date, currentUser }) => {
    const classes = useStyles();
    const [ingredients, setIngredients] = useState([]);
    const [usePadding, setUsePadding] = useState(false);
    useEffect(() => {
        async function fetchData() {
            // Get data
            const resIngredients = await getIngredientsFromDatabase(recipe_id);
            setIngredients(resIngredients);
        }
        fetchData();

        if ((user === currentUser.user_name) || (currentUser.is_admin === 1)) {
            setUsePadding(true);
        }
    }, [currentUser.is_admin, currentUser.user_name, recipe_id, user]);



    //   console.log(`${user} comparing to ${currentUser.user_name}`)
    //   console.log(user === currentUser.user_name || currentUser.is_admin === 1)

    return (
        <BoxContainer>
            {/* Only if the post belongs to the user that is logged in or is admin */}
            {/* {localStorage.token && ( */}

            {((user === currentUser.user_name) || (currentUser.is_admin === 1)) && (

                <div className={classes.buttonContainer}>
                    <Fragment>
                        <Delete deleteEndpoint={`/api/posts/${post_id}`} />
                        <Link
                            to={`/edit/${post_id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                size="small"
                                onClick={() => {
                                    console.log("edit");
                                }}
                            >
                                Edit
                            </Button>
                        </Link>
                    </Fragment>
                </div>
            )}
            {/* )} */}
            <div className={classes.container} style={!usePadding ? { marginTop: "4rem" } : {}}>

                <img src={img} alt="wrapper" className={classes.image} />
                <Typography className={classes.heading}>{title}</Typography>
                <Typography className={classes.text}>USER: {user}</Typography>
                <Typography className={classes.text}>DATE: {date}</Typography>
                <Typography className={classes.text}>USER RATING: {rating} / 5</Typography>
                <Typography className={classes.text}>CATEGORY: {category.replace("_", " ")}</Typography>
                <Typography className={classes.detail}>INGREDIENTS: {String(ingredients)}</Typography>
                <Typography className={classes.detail}>INSTRUCTIONS: {instructions}</Typography>
                {/* <LinesEllipsis
                text={text}
                maxLine="3"
                ellipsis="..."
                trimRight
                basedOn="letters"
                className={classes.detail}
            /> */}
            </div >
        </BoxContainer>
    );
};

async function getIngredientsFromDatabase(recipe_id) {
    const res = await axios({
        method: "get",
        url: `/api/ingredients/${recipe_id}`,
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
}

const BoxContainer = styled.div`
    transition: all .3s ease-in-out;
    &:hover {
        transform: rotate(0.2deg) scale(1.01);
    }
`;

export default Post;
