import React, { useCallback } from 'react'
import { logout } from '../../utils/jwt-helper';
import { useNavigate } from 'react-router-dom';

const Account = () => {

    const navigate = useNavigate();
    const onLogout = useCallback(() => {

        logout();
        navigate('/');
      // Handle logout logic here
    }, []);

  return (
    <div>
      <p className='text-lg font-bold'>Account Details</p>
      <button onClick={onLogout} className='w-[150px] items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800'>Logout</button>
    </div>
  )
}

export default Account
