import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';

const CategoryServices = () => {
    const [cart, setCart] = useCart();

    const params = useParams();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [category, setCategory] = useState([]);
    const getServicesByCategory = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/service/service-category/${params.slug}`
            );
            setServices(data?.services);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.slug) getServicesByCategory();
    }, [params?.slug]);
    return (
        <Layout title={`${category?.name} services - Helper`}>
            <div className='container py-5'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <h5>Category: {category?.name}</h5>
                    <p>
                        Total {services?.length}{' '}
                        {services?.length < 2 ? 'Service' : 'Services'} Found
                    </p>
                </div>
                <div className='row'>
                    {services?.map((p) => (
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
                                        Price: <b>{p.price} /=</b>
                                    </p>
                                    <div className='d-flex gap-2 mt-2'>
                                        <button
                                            className='btn btn-outline-dark rounded-0'
                                            onClick={() =>
                                                navigate(`/service/${p.slug}`)
                                            }
                                        >
                                            Details
                                        </button>
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

export default CategoryServices;
