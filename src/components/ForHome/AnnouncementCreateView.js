import React, { useState } from "react";
import {
    Box,
    Typography,
    makeStyles,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from "@material-ui/core";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
    container: {
        padding: "0 100px",
        [theme.breakpoints.down("md")]: {
            padding: 0,
        },
    },
    image: {
        width: "100%",
        height: "80vh",
        objectFit: "cover",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
    },
    textField: {
        flex: 1,
        margin: "0 1.875rem",
        padding: "1rem 0",
        fontSize: 25,
    },
    textarea: {
        flex: 1,
        margin: "0 1.875rem",
        padding: "1rem 0 2rem 0",
        fontSize: 18,
        "&:focus-visible": {
            outline: "none",
        },
    },
    inputLabel: {
        margin: "0.8rem 0 0 0.6rem"
    },
    button: {
        marginTop: "2rem",

    },
    warning: {
        fontSize: '14px',
        color: 'red'
    }
}));

const AnnouncementCreateView = () => {
    const classes = useStyle();
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");
    const [valid, setValid] = useState(true);

    const isEmptyField = str => {
        return !str || !str.trim().length;
    }

    // const onChangeFile = e => {
    //     setFileName(e.target.files[0]);
    // }

    const validate = () => {
        let isValid = true;
        if (isEmptyField(title)) { isValid = false }
        else if (isEmptyField(message)) { isValid = false }

        setValid(isValid);
        return isValid;
    }

    const submit = (e) => {
        e.preventDefault();
        // Validation - prevent submission if missing fields
        if (!validate()) {
            return;
        }

        // const current = new Date();
        // const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        let body = { title, user, content: message };

        axios
            .post("/api/messages", body)
            .then((res) => console.log("saved! " + res.data))
            .catch((err) => console.log(err));

        window.location.href = "/";
    }

    return (
        <Box className={classes.container}>
            {/* <img className={classes.image} src={url} alt="banner" /> */}
            <form className={classes.form} encType="multipart/form-data">
                {/* <AddCircle fontSize="large" color="action" /> */}
                <TextField
                    error={isEmptyField(title)}
                    helperText={isEmptyField(title) ? "Required field" : ""}
                    variant="outlined"
                    placeholder="Title"
                    className={classes.textField}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    error={isEmptyField()}
                    helperText={isEmptyField(message) ? "Required field" : ""}
                    multiline
                    variant="outlined"
                    placeholder="Message..."
                    className={classes.textField}
                    onChange={(e) => setMessage(e.target.value)}
                />



                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={submit}
                >
                    Post
                </Button>
                {!valid && (
                    <div className={classes.warning}>Required fields are missing!</div>
                )}
            </form>
        </Box>
    );
};

export default AnnouncementCreateView;
