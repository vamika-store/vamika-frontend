import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart'
import { fetchUserDetails } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';



const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);

  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach(element => {
      value += element?.price * element?.quantity || 0;
    });
    return value;
  }, [cartItems]);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then(response => {
        setUserInfo(response);
      }).catch(error => {
      }).finally(() => {
        dispatch(setLoading(false));
      });
  }, [])
  return (
    <div className='p-8 flex'>
      <div className='w-[80%]'>
        <div className='flex gap-8'>
          {/* Address */}
          <p className='font-bold'>Delivery Address :</p>
          { userInfo?.addressList && 
          <div>
            <p>{userInfo.addressList[0]?.name}</p>
            <p>{userInfo.addressList[0]?.addressLine}</p>
            <p>{userInfo.addressList[0]?.street}</p>
            <p>{userInfo.addressList[0]?.city}, {userInfo.addressList[0]?.state}, {userInfo.addressList[0]?.country} - {userInfo.addressList[0]?.zipCode}</p>
            <p>Phone: {userInfo.addressList[0]?.phoneNumber}</p>
          </div>}
        </div>
        <hr className='h-[2px] bg-slate-200 w-[90%] my-4'></hr>
        <div className='flex gap-8 flex-col'>
          {/* Address */}
          <p className='font-bold'>Choose Address :</p>
          <div>
            <p>Select a day</p>
            <div className='flex gap-4 mt-4'>
                    <div className='w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer 
                     hover:scale-110 bg-white border-gray-500'><p>{'Jul 25'}</p></div>

                    <div className='w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer 
                     hover:scale-110 bg-white border-gray-500'><p>{'Jul 26'}</p></div>
                    </div>
          </div>
        </div>
        <hr className='h-[2px] bg-slate-200 w-[90%] my-4'></hr>
        <div className='flex flex-col gap-2'>
          {/* Address */}
          <p className='font-bold'>Payment Method :</p>
          <div className='mt-4 flex flex-col gap-2'>
            <div className='flex gap-2'>
                <input type='radio' name='payment' id='card' className='mr-2' />
                <p> Credit/Debit Card</p>
            </div>
            <div className='flex gap-2'>
                <input type='radio' name='payment' id='cod' className='mr-2' />
                <p>Cash on Delivery</p>
            </div>
            <div className='flex gap-2'>
                <input type='radio' name='payment' id='upi' className='mr-2' />
                <p>UPI</p>
            </div>
          </div>
        </div>
        <button className='w-[150px] h-[48px] item-center bg-black border rounded-lg mt-2 text-white hover:bg-black-800'>Place Order</button>
      </div>
      <div className='w-[30%] h-[30%] border rounded-lg border-gray-500 p-4 flex flex-col gap-4'>
        <p>Order Summary</p>
        <p>Items Count - {cartItems?.length || 0}</p>
        <p>SubTotal - ${subTotal}</p>
        <p>Shipping - $0.00</p>
        <hr className='h-[2px] bg-gray-400'></hr>
        <p>Total - ${subTotal}</p>
      </div>
    </div>
  )
}

export default Checkout
