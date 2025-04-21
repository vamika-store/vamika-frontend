import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation/Navigation';
import BckgImage from '../assets/img/bg-1.png';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

const AuthenticationWrapper = () => {

    const isLoading = useSelector((state)=> state?.commonState?.loading);
    return (
        <div>
            <Navigation variant="auth"/>
            <div className='flex md:flex-row justify-between w-full'>
                <div className='w-[50%] lg:w-[40%] hidden md:inline py-2'>
                    <img src={BckgImage} className='bg-cover w-small bg-center' alt='shoppingimage'/>
                </div>
                <div>
                <Outlet/>
                </div>
            </div>
            { isLoading && <Spinner />}
        </div>
    );
};

export default AuthenticationWrapper;