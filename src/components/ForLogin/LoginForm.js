import React, { useState } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
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
    height: '23rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

}

const buttonStyle = {
    marginTop: '1.2rem',
    textAlign: 'center'
};

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(true);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };
        await login(credentials);
    }

    return (
        <div style={divStyle}>
            <div style={containerStyle}>
                <Form horizontal className="LoginForm" id="loginForm">
                    <LoginIcon color="inherit" sx={{ fontSize: 60 }} />
                    <Typography variant="h5" gutterBottom component="div">
                        Login
                    </Typography>

                    <FormGroup controlId="formEmail">
                        <FormControl
                            type="email"
                            placeholder="Email Address"
                            className="email"
                            onChange={(e) => setEmail(e.target.value)}
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

                    <FormGroup
                        style={buttonStyle}
                        controlId="formSubmit"
                        className="login"
                    >
                        <Button
                            variant="contained"
                            size="large"
                            color="inherit"
                            onClick={handleFormSubmit}
                        >
                            Login
                        </Button>
                    </FormGroup>
                    {!valid && <div>Invalid credentials!</div>}
                </Form>
            </div>
        </div>
    );


    async function login(credentials) {
        try {
            console.log("In here");
            const res = await axios.post("/api/auth", credentials);
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

export default LoginForm;
