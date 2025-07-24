import React, {useCallback, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart'
import { NumberInput } from '../../components/NumberInput/NumberInput'
import DeleteIcon from '../../components/common/DeleteIcon'
import Modal from 'react-modal'
import { customStyles } from '../../styles/modal'
import emptyCart from '../../assets/img/empty_cart.png'
import { Link, useNavigate } from 'react-router-dom'
import { updateItemToCartAction, deleteItemFromCartAction } from '../../store/actions/cartAction'
import { isTokenValid } from '../../utils/jwt-helper'


const headers = [
    "Product Details","Price","Quantity","Shipping","SubTotal","Action"
];


const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  console.log("Cart Items", cartItems);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const navigate = useNavigate();

  const onChangeQuantity = useCallback((value, productId, variantId) => {
    
    console.log("Recived", value);
      
      dispatch(updateItemToCartAction({
            productId: productId,
            variantId: variantId,
            quantity: value
          }
      ));
  }, [dispatch]);

  const onDeleteProduct = useCallback((productId, variantId) => {
    setModalOpen(true);
    setDeleteItem({ 
        productId: productId, 
        variantId: variantId 
    });
  }, []);

  const onCloseModal = useCallback(() => {
    setDeleteItem({});
    setModalOpen(false);
  }, []);

  const onDeleteItem = useCallback(() => {
    dispatch(deleteItemFromCartAction(deleteItem));
    setModalOpen(false);
  }, [dispatch, deleteItem]);

  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach(element => {
      value += element?.subTotal || 0;
    });
    return value?.toFixed(2);
  }, [cartItems]);

  const isLoggedIn = useMemo(() => {
    return isTokenValid();
  }, []);
  console.log("isLoggedIn", isLoggedIn, isTokenValid());


  return (
    <>
    <div className='p-4'>
        {cartItems?.length >0 &&
        <>
        <p className='text-xl text-black p-4'>Shipping Bag</p>
        <table className='w-full text-lg'>
          <thead className='text-sm bg-gray-800 text-white uppercase'>
            <tr>
              {
                headers?.map(header => {
                  return (
                    <th scope='col' className='px-6 py-3'>
                      {header}
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              cartItems?.map((item, index) => {
                return (
                    <tr className='p-4 bg-white border-b'>
                      <td>
                        <div className='flex items-center p-4'>
                          <img src={item?.thumbnail} alt={'product-' + index} className='w-[80px] h-[80px] object-cover' />
                          <div className='flex flex-col text-sm px-2 text-gray-600'>
                            <p>{item?.name || 'Name'}</p>
                            <p>Size: {item?.variant?.size || 'Size'}</p>
                            <p>Color: {item?.variant?.color || 'Color'}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='text-center text-sm text-gray-600'>${item?.price || '0.00'}</p>
                      </td>
                      <td>
                        <NumberInput max={2} quantity={item?.quantity} onChangeQuantity={(value)=> onChangeQuantity(value, item?.productId, item?.variant?.id)} />
                      </td>
                      <td>
                        <p className='text-center text-sm text-gray-600'>Free</p>
                      </td>
                      <td>
                        <p className='text-center text-sm text-gray-600'>${item?.subTotal || '0.00'}</p>
                      </td>
                      <td>
                        <button className='flex justify-center items-center w-full' onClick={() => onDeleteProduct(item?.productId, item?.variant?.id)}><DeleteIcon /></button>
                      </td>
                    </tr>
                )
              })
            }
          </tbody>
        </table>
        <div>
          <div className='flex justify-between p-8 bg-gray-200'>
            <div>
              <p className='text-lg text-gray-600'>Discount Coupon</p>
              <p className='text-sm text-gray-500'>Enter your coupon code</p>
              <form>
                <input type="text" className='border border-gray-300 p-2 rounded-md' placeholder='Coupon code' />
                <button type="submit" className='bg-gray-800 text-white px-4 py-2 rounded-md'>Apply</button>
              </form>
            </div>
            <div className='mr-20 pr-8'>
              <div className='flex gap-8 text-lg'> <p className='w-[120px]'>subTotal</p> <p>${subTotal}</p></div>
              <div className='flex gap-8 text-lg mt-2'> <p className='w-[120px]'>Shipping</p> <p>${0}</p></div>
              <div className='flex gap-8 text-lg mt-2 font-bold'> <p className='w-[120px]'>Total</p> <p>${subTotal}</p></div>
              <hr className='h-[2px] bg-slate-400 mt-2' />
              { isLoggedIn && <button className='w-full item-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800' onClick={() => navigate('/checkout')}>Checkout</button>}
              { !isLoggedIn && <div className='p-4'> <Link to={'/api/auth/login'} className='w-full p-2 text-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800'>Login to Checkout</Link></div>}
            </div>
          </div>
        </div>
      </>}
      {
        !cartItems?.length && 
        <div className='w-full items-center text-center'>
          <div className='flex justify-center '><img  src={emptyCart} className='w-[240px] h-[240px]' alt="empty-cart" /></div>
          <p className='text-3xl font-bold'>Your cart is empty</p>
          <div className='p-4'><Link to={'/'} className='w-full p-2 text-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800'>Continue Shopping</Link></div>
        </div>
      }
    </div>
    <Modal
      isOpen={modalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Remove Item Confirmation"
      >
      <p>Are you sure you want to remove this item from your cart?</p>
      <div>
        <button className='h-[48px]' onClick={onCloseModal}>Cancel</button>
        <button className='bg-black text-white w-[80px] h-[48px] border rounded-lg' onClick={onDeleteItem}>Remove</button>
      </div>
    </Modal>
  </>

  )
}

export default Cart
