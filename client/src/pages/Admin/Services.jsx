import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Services = () => {
    const [services, setServices] = useState([]);

    //get all services
    const getAllServices = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/service/get-service`
            );
            setServices(data.services);
        } catch (error) {
            console.log(error);
            toast.error('Someething Went Wrong');
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllServices();
    }, []);
    return (
        <Layout title='All Services - Admin Dashboard - Helper'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h3 className='pb-3'>All Service List</h3>
                        <div className='row'>
                            {services?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/services/${p.slug}`}
                                    className='service-link text-decoration-none col-md-4 mb-4'
                                >
                                    <div className='card border-0 shadow-lg'>
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
                                        <div className='card-body'>
                                            <h5 className='card-title'>
                                                {p.name}
                                            </h5>
                                            <p className='card-text'>
                                                {p.description.slice(0, 45)}...
                                            </p>
                                            <p className=''>
                                                Price: <b>{p.price}</b>/=
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Services;
