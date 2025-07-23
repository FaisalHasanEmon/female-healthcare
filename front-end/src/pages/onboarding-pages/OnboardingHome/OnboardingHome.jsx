import React from 'react';
import { Link } from 'react-router-dom';

const OnboardingHome = () => {
    return (
        <div className='flex flex-col gap-5 text-center'>
            <p className='text-3xl font-semibold font-playfair-display'>Welcome to FENYX</p>
            <p className='font-montserrat'>Let's get to know your body better so we can support you every step of the way.</p>
            <div>
                <Link to="/onboarding/page1"><button className='btn bg-brandPrimary hover:bg-brandPrimary px-10'>Get Started</button></Link>
            </div>
        </div>
    );
};

export default OnboardingHome;