import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
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
                        <h5>
                            Total: <b className='fw-bold'>{totalPrice()}</b> /=
                        </h5>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
