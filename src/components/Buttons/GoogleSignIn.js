import React, { useCallback } from 'react'
import GoogleLogo from '../../assets/img/Google.png';
import { API_BASE_URL } from '../../api/constant';

const GoogleSignIn = () => {

  const handleclick = useCallback(() => {
    window.location.href = API_BASE_URL + '/oauth2/authorization/google';
  },[])

  return (
    <button onClick={handleclick} className='flex justify-center items-center border w-full rounded border-gray-600 h-[40px] hover:bg-slate-50'>
        <img src={GoogleLogo} alt="Google Logo" className='h-5 w-5 mr-2' />
        <span className='px-2 text-gray-500'>continue with Google</span>
    </button>
  )
}

export default GoogleSignIn