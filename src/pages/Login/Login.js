import React, { useCallback } from 'react';
import GoogleSignIn from '../../components/Buttons/GoogleSignIn';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { loginApi } from '../../api/authentication';
import { saveToken } from '../../utils/jwt-helper';

const Login = () => {
    const [values, setValues] = React.useState({
        userName: '',
        password: ''
    });
    const [error, setError] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setError('');
        dispatch(setLoading(true));
        loginApi(values).then((res) => {
            if(res?.token) {
                saveToken(res?.token);
                navigate('/');
            }
            else {
                setError("something went wrong, please try again later");
            }
        }).catch((err) => {
            setError("Invalid username or password");
        }).finally(() => {
            dispatch(setLoading(false));
        });
    },[dispatch,values]);

    const handleOnChange = useCallback((e) => {
        e.persist();
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    },[]);
    return (
        <div className='px-8 w-full lg:w-[70%]'>
            <p className='text-3xl font-bold pb-4 pt-4'>Sign In</p>
            <GoogleSignIn />
            <p className='text-gray-500 items-center w-full py-2'>OR</p>
        
            <div className='pt-4'>
                <form onSubmit={onSubmit}>
                    <label>Email Address</label>
                    <input type="email" name='userName' value={values?.userName} onChange={handleOnChange} placeholder='Email address' className='h-[48px] w-full border p-2 border-gray-400' required/>
                    <label>Password</label>
                    <input type="password" name='password' value={values?.password} onChange={handleOnChange} placeholder='Password' className='h-[48px] w-full border p-2 border-gray-400' required autoComplete='new-password'/>
                    <Link className='text-right w-full float-right underline pt-2 text-gray-500 hover:text-black'>Forgot Password?</Link>
                    <button className='border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Sign In</button>
                </form>
            </div>
            {error && <p className='text-lg text-red-700'>{error}</p>}
            <Link to={"/api/auth/register"} className='underline text-gray-500 hover:text-black'>Don’t have an account? Sign up</Link>
        </div>
    );
};

export default Login;