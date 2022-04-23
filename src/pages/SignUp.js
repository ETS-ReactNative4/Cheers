import React from 'react';
import SignUpPage from '../components/ForSignUp/SignUpPage';
import Banner from '../components/Banner/Banner';
import { signUpBanner } from '../Data/bannerData';


function SignUp() {
    return (
        <>
            <Banner {...signUpBanner} />
            <SignUpPage />
        </>
    );
}

export default SignUp;