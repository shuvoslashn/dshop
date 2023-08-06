import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = +total + +item.price;
            });
            return total.toLocaleString('en-BD', {
                style: `currency`,
                currency: 'BDT',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const newTotalPrice = totalPrice();

    // handle payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/api/v1/service/order`,
                { cart }
            );
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Order placed successfully');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title='Cart - Helper'>
            <div className='container py-5'>
                <div className='mb-4'>
                    <h5>
                        {cart?.length
                            ? `You have ${cart.length} items in cart ${
                                  auth?.token ? '' : 'please login to checkout'
                              }`
                            : 'Your cart is empty'}
                    </h5>
                </div>
                <div className='row justify-content-between'>
                    <div className='col-md-8'>
                        {cart?.map((p) => (
                            <div
                                className='container p-4 shadow-lg mb-4'
                                key={p._id}
                            >
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <img
                                            src={`${
                                                import.meta.env
                                                    .VITE_REACT_API_URL
                                            }/api/v1/service/service-photo/${
                                                p._id
                                            }`}
                                            className='card-img-top'
                                            alt={p.name}
                                        />
                                    </div>
                                    <div className='col-md-8'>
                                        <h4>{p.name}</h4>
                                        <p className='mb-2'>
                                            {p.description.slice(0, 40)}...
                                        </p>
                                        <h6>
                                            Price :{' '}
                                            <b className='fw-bold'>{p.price}</b>
                                            /=
                                        </h6>
                                        <button
                                            className='btn btn-outline-dark small rounded-0 mt-2'
                                            onClick={() =>
                                                removeCartItem(p._id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* checkout system */}
                    <div className='col-md-3'>
                        <h3>Cart Summary</h3>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h5 className='pb-4'>
                            Total: <b className='fw-bold'>{totalPrice()}</b> /=
                        </h5>
                        <hr />
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h5 className='fw-semibold'>
                                        Current Address
                                    </h5>
                                    <h6 className='py-3'>
                                        {auth?.user?.address}
                                    </h6>
                                    <button
                                        className='btn edit-btn small py-2'
                                        onClick={() =>
                                            navigate('/dashboard/user/profile')
                                        }
                                    >
                                        Update Address
                                    </button>
                                    {cart.length === 0 ? (
                                        ''
                                    ) : (
                                        <button
                                            className='btn btn-dark mt-3 d-block'
                                            onClick={handlePayment}
                                        >
                                            Place Order
                                        </button>
                                    )}
                                    <h6
                                        className='mt-4'
                                        style={{ lineHeight: '1.7em' }}
                                    >
                                        We accept only{' '}
                                        <p className='px-2 bg-info text-white mb-0'>
                                            {' '}
                                            cash on delivery{' '}
                                        </p>
                                        now. We plan to add payment gateway in
                                        future.
                                    </h6>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='mb-3'>
                                    {auth?.token ? (
                                        <>
                                            <button
                                                className='btn edit-btn small'
                                                onClick={() =>
                                                    navigate(
                                                        '/dashboard/user/profile'
                                                    )
                                                }
                                            >
                                                Update Address
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className='btn btn-dark small py-2'
                                            onClick={() => navigate('/login')}
                                        >
                                            Please login to checkout
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
