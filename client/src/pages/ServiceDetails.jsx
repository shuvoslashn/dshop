import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';

const ServiceDetails = () => {
    const [cart, setCart] = useCart();

    const params = useParams();
    const [service, setService] = useState({});
    const [relatedService, setRelatedService] = useState([]);

    const navigate = useNavigate();

    //initial details
    useEffect(() => {
        if (params?.slug) getService();
    }, [params?.slug]);

    //get services
    const getService = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/service/get-service/${params.slug}`
            );
            setService(data?.service);
            getSimilarService(data?.service?._id, data?.service?.category?._id);
        } catch (error) {
            console.log(error);
        }
    };

    // get similar service
    const getSimilarService = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/service/related-service/${pid}/${cid}`
            );
            setRelatedService(data?.services || []);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title='Service Details'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img
                            src={`${
                                import.meta.env.VITE_REACT_API_URL
                            }/api/v1/service/service-photo/${service._id}`}
                            className='card-img-top'
                            alt={service.name}
                        />
                    </div>
                    <div className='col-md-6'>
                        <div className='service-details'>
                            <h6>Service Name: </h6>
                            <h3 className='mb-4'>{service?.name}</h3>
                            <h6>Short Description: </h6>
                            <p className='mb-4'>
                                {service?.description?.slice(0, 350)}
                            </p>
                            <h6>Service Price: </h6>
                            <h4 className='mb-4 fw-semibold'>
                                {service?.price} Taka
                            </h4>
                            <h6 className='mb-4'>
                                Category:{' '}
                                <span className='text-secondary'>
                                    {service?.category?.name}
                                </span>
                            </h6>
                            {/* <button className='btn btn-dark rounded-0'>
                                Add to Cart
                            </button> */}
                            <button
                                className='btn btn-dark rounded-0'
                                onClick={() => {
                                    if (
                                        cart.some(
                                            (item) => item._id === service._id
                                        )
                                    ) {
                                        toast.error(
                                            `${service.name} already in cart`
                                        );
                                    } else {
                                        setCart([...cart, service]);
                                        localStorage.setItem(
                                            'cart',
                                            JSON.stringify([...cart, service])
                                        );
                                        toast.success(
                                            `${p.name} added to cart`
                                        );
                                    }
                                }}
                            >
                                Add to cart
                            </button>
                            {/* change of add to cart */}
                        </div>
                    </div>
                </div>

                <h5 className='mt-5'>Service Description</h5>
                <p className='my-3'>{service?.description?.slice(0, 350)}</p>
                <h5 className='mt-5 mb-3'>Similar Services</h5>
                <div className='row'>
                    {relatedService?.map((p) => (
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
                                        Price:{' '}
                                        <b className='fw-bold'>{p.price}/=</b>{' '}
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

export default ServiceDetails;
