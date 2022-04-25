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
  TextField,
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
    margin: "0.8rem 0 0 0.6rem",
  },
  button: {
    marginTop: "2rem",
  },
  warning: {
    fontSize: "14px",
    color: "red",
  },
}));

const EditUserView = () => {
  const classes = useStyle();

  const [user, setUser] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [valid, setValid] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getUserFromDatabase();
      setUser(res);
      console.log(res);
      setNewFirstName(res.first_name);
      setNewLastName(res.last_name);
    //   setNewPassword(res.password);
    }
    fetchData();
  }, []);

  const isEmptyField = (str) => {
    return !str || !str.trim().length;
  };

  const validate = () => {
    let isValid = true;
    if (isEmptyField(newFirstName)) {
      isValid = false;
    } else if (isEmptyField(newLastName)) {
      isValid = false;
    } else if (isEmptyField(newPassword) || newPassword.length < 6) {
      isValid = false;
    }

    setValid(isValid);
    return isValid;
  };

  const submit = (e) => {
    e.preventDefault();
    // Validation - prevent submission if missing fields
    if (!validate()) {
      return;
    }

    // Create form object for password request
    let body = {
      password: newPassword,
      first_name: newFirstName,
      last_name: newLastName,
    };

    axios
      .put(`/api/users`, body)
      .then((res) => {
        console.log("saved! " + res.data);
        axios.put(`/api/users/name`, body).then((res) => {
          console.log("saved! " + res.data);
          
        });
      })
      .catch((err) => console.log(err));

    window.location.href = "/";
  };

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
          value={newFirstName}
        />

        <TextField
          error={isEmptyField()}
          helperText={isEmptyField(newLastName) ? "Required field" : ""}
          variant="outlined"
          placeholder="Enter new last name"
          className={classes.textField}
          onChange={(e) => setNewLastName(e.target.value)}
          value={newLastName}
        />

        <TextField
          error={isEmptyField()}
          helperText={
            isEmptyField(newPassword)
              ? "Required field"
              : newPassword.length < 6
              ? "Must be at least 6 characters"
              : ""
          }
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

async function getUserFromDatabase() {
  const res = await axios({
    method: "get",
    url: "/api/auth",
    headers: { "Content-Type": "application/json" },
  });
  return res.data[0];
}

export default EditUserView;
