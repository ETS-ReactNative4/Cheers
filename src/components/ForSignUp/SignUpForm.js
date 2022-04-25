import React, { useState } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import Checkbox from 'material-ui/Checkbox';
import axios from "axios";
//import setAuthToken from "../../utils/setAuthToken";

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '5rem',

};


const containerStyle = {
    backgroundColor: 'rgb(255, 111, 97, 0.8)',
    paddingLeft: 20,
    paddingRight: 20,
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '2rem',
    width: '20rem',
    height: '26rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

}

const buttonStyle = {
    marginTop: '1rem',
    textAlign: 'center'
};

const SignUpForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState("false");
    const [ofAge, setOfAge] = useState(false);
    const [valid, setValid] = useState(true);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const credentials = { user_name: userName, email, first_name: firstName, last_name: lastName, password, is_admin: 0 };
        await signUp(credentials);
    }

    return (
        <div style={divStyle}>
            <div style={containerStyle}>
                <Form horizontal className="SignUpForm" id="signUpForm">
                    <LoginIcon color="inherit" sx={{ fontSize: 60 }} />
                    <Typography variant="h5" gutterBottom component="div">
                        Sign Up
                    </Typography>

                    <FormGroup controlId="formUserName">
                        <FormControl
                            type="text"
                            placeholder="User name"
                            className="userName"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup controlId="formEmail">
                        <FormControl
                            type="text"
                            placeholder="Email Address"
                            className="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup controlId="formFirstName">
                        <FormControl
                            type="text"
                            placeholder="First Name"
                            className="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup controlId="formLastName">
                        <FormControl
                            type="text"
                            placeholder="Last Name"
                            className="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup controlId="formPassword">
                        <FormControl
                            type="password"
                            placeholder="Password"
                            className="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup controlId="formCheckbox">
                        <Form.Check
                            inline
                            label=" I confirm that I am 21 years or older."
                            className="checkbox"
                            type="checkbox"
                            onChange={(e) => setOfAge(!ofAge)}
                        />
                    </FormGroup>

                    {!ofAge && <div>Must be 21 years or older!</div>}

                    <FormGroup
                        style={buttonStyle}
                        controlId="formSubmit"
                        className="signUp"
                    >
                        <Button
                            variant="contained"
                            size="large"
                            color="inherit"
                            onClick={handleFormSubmit}
                        >
                            Sign Up
                        </Button>
                    </FormGroup>
                    {!valid && <div>Invalid credentials!</div>}
                </Form>
            </div>
        </div>
    );


    async function signUp(credentials) {
        try {
            const res = await axios.post("/api/users", credentials);
            const jwt = res.data.token
            localStorage.setItem("token", jwt);
            window.location.href = "/";
        }
        catch (e) {
            console.error("ERROR", e);
            localStorage.removeItem("token");
            setValid(false);
        }
    }
}

export default SignUpForm;
