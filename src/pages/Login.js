import React from 'react';
import LoginPage from '../components/ForLogin/LoginPage';
import Banner from '../components/Banner/Banner';
import { loginBanner } from '../Data/bannerData';


function Login() {
    return (
        <>
            <Banner {...loginBanner} />
            <LoginPage />
        </>
    );
}

export default Login;