import React, { useEffect, useState } from "react";

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
        marginTop: "2rem"
    },
    warning: {
        fontSize: '14px',
        color: 'red'
    }
}));

const EditUserView = () => {
    const classes = useStyle();
    const userId = window.location.href.split("/edit/user/")[1]; // CHANGE

    const [user, setUser] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [valid, setValid] = useState(true);

    useEffect(async () => {
        const res = await getUser(userId);
        setUser(res);
        setNewFirstName(res.first_Name);
        setNewLastName(res.last_Name);
        setNewPassword(res.password);
    }, []);

    const isEmptyField = str => {
        return !str || !str.trim().length;
    }

    const validate = () => {
        let isValid = true;
        if (isEmptyField(newFirstName)) { isValid = false }
        else if (isEmptyField(newLastName)) { isValid = false }
        else if (isEmptyField(newPassword)) { isValid = false }

        setValid(isValid);
        return isValid;
    }

    const submit = (e) => {
        e.preventDefault();
        // Validation - prevent submission if missing fields
        if (!validate()) {
            return;
        }

        // Create form object and send request
        const body = { user_name: user.user_name, email: user.email, first_name: newFirstName, last_name: newLastName, password: newPassword, is_admin: user.is_admin };

        axios
            //.put(`/api/post/${postId}`, body) CHANGE
            .then((res) => console.log("saved! " + res.data))
            .catch((err) => console.log(err));
    }

    return (
        <Box className={classes.container}>
            {/* <img className={classes.image} src={url} alt="banner" /> */}
            <form className={classes.form} encType="multipart/form-data">
                {/* <AddCircle fontSize="large" color="action" /> */}
                <TextField
                    error={isEmptyField()}
                    helperText={isEmptyField(newFirstName) ? "Required field" : ""}
                    variant="outlined"
                    placeholder="Enter new first name"
                    className={classes.textField}
                    onChange={(e) => setNewFirstName(e.target.value)}
                />

                <TextField
                    error={isEmptyField()}
                    helperText={isEmptyField(newLastName) ? "Required field" : ""}
                    variant="outlined"
                    placeholder="Enter new last name"
                    className={classes.textField}
                    onChange={(e) => setNewLastName(e.target.value)}
                />


                <TextField
                    error={isEmptyField()}
                    helperText={isEmptyField(newPassword) ? "Required field" : ""}
                    multiline
                    variant="outlined"
                    placeholder="Enter new password"
                    className={classes.textField}
                    onChange={(e) => setNewPassword(e.target.value)}
                />


                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={submit}
                >
                    Save changes
                </Button>
                {!valid && (
                    <div className={classes.warning}>Required fields are missing!</div>
                )}
            </form>
        </Box>
    );
};

async function getUser(id) {
    // const res = await axios({
    //     method: "get",
    //     url: `/api/research/post/${id}`,
    //     headers: { "Content-Type": "application/json" },
    // });
    // return res.data;
}

export default EditUserView;
