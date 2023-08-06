import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    return (
        <Layout title='Search Result - Helper'>
            <div className='container py-5'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <h5 className='ps-2 cat-heading'>Search Results</h5>
                    <h6>
                        {values?.results.length < 1
                            ? `No service found`
                            : `Found ${values?.results.length} ${
                                  values?.results.length < 2
                                      ? 'Service'
                                      : 'Services'
                              }`}
                    </h6>
                </div>

                <div className='row'>
                    {values?.results.map((p) => (
                        <div className='col-md-4 mb-4' key={p._id}>
                            <div className='card m-1 border-0 shadow-lg'>
                                <img
                                    src={`${
                                        import.meta.env.VITE_REACT_API_URL
                                    }/api/v1/service/service-photo/${p._id}`}
                                    className='card-img-top'
                                    alt={p.name}
                                />
                                <div className='card-body'>
                                    <h5 className='card-title'>{p.name}</h5>
                                    <p className='card-text'>
                                        {p.description.substring(0, 30)}
                                        ...
                                    </p>
                                    <p className='card-text'>
                                        Price: 
                                        <b className='fw-bold'>{p.price}/=</b>{}' '
                                    </p>
                                    <div className='d-flex gap-2'>
                                        <button
                                            className='btn btn-outline-dark rounded-0'
                                            onClick={() =>
                                                navigate(`/service/${p.slug}`)
                                            }
                                        >
                                            Details
                                        </button>
                                        {/* <button className='btn btn-dark rounded-0'>
                                            Add to cart
                                        </button> */}
                                        <button
                                            className='btn btn-dark rounded-0'
                                            onClick={() => {
                                                if (
                                                    cart.some(
                                                        (item) =>
                                                            item._id === p._id
                                                    )
                                                ) {
                                                    toast.error(
                                                        `${p.name} already in cart`
                                                    );
                                                } else {
                                                    setCart([...cart, p]);
                                                    localStorage.setItem(
                                                        'cart',
                                                        JSON.stringify([
                                                            ...cart,
                                                            p,
                                                        ])
                                                    );
                                                    toast.success(
                                                        `${p.name} added to cart`
                                                    );
                                                }
                                            }}
                                        >
                                            Add to cart
                                        </button>
                                        {/* change of cart button */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Search;
