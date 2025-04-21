import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading } from '../../store/features/common'; // Adjust the path as per your project structure
import GoogleSignIn from '../../components/Buttons/GoogleSignIn'; // Adjust the path as per your project structure
import { registerApi } from '../../api/authentication'; // Adjust the path as per your project structure
import VerifyCode from './VerifyCode'; // Adjust the path as per your project structure

const Register = () => {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [enableVerify, setEnableVerify] = useState(false);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));
    registerApi(values).then((res) => {
      if(res?.token) {
        setEnableVerify(true);
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
    <div className='px-8 w-full lg:w-[60%]'>
      {!enableVerify && 
      <>
      <p className='text-3xl font-bold pb-4 pt-4'>Sign Up</p>
      <GoogleSignIn/>
      <p className='text-gray-500 items-center w-full py-2'>OR</p>
    
      <div className='pt-4'>
        <form onSubmit={onSubmit} autoComplete='off'>
          <input type="email" name='email' value={values?.userName} onChange={handleOnChange} placeholder='Email address' className='h-[40px] mt-4 w-full border p-2 border-gray-400' required/>
          <input type="password" name='password' value={values?.password} onChange={handleOnChange} placeholder='Password' className='h-[40px] mt-4 w-full border p-2 border-gray-400' required/>
          <input type="text" name='firstName' value={values?.firstName} onChange={handleOnChange} placeholder='First Name' className='h-[40px] mt-4 w-full border p-2 border-gray-400' required/>
          <input type="text" name='lastName' value={values?.lastName} onChange={handleOnChange} placeholder='Last Name' className='h-[40px] mt-4 w-full border p-2 border-gray-400' required/>
          <input type="phone number" name='phone' value={values?.phone} onChange={handleOnChange} placeholder='Phone Number' className='h-[40px] mt-4 w-full border p-2 border-gray-400' required/>
          <button className='border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Sign Up</button>
        </form>
      </div>
      {error && <p className='text-lg text-red-700'>{error}</p>}
      <Link to={"/api/auth/login"} className='underline text-gray-500 hover:text-black'>Already have an  account? Log in</Link>
      </>
      }
      {enableVerify && <VerifyCode email={values?.email}/>}
    </div>
  )
}

export default Register