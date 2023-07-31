import React from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <Layout title='404 - Dshop.com'>
            <div className='container py-5'>
                <div className='text-center py-5'>
                    <h1 className='display-1 fw-bolder'>404</h1>
                    <h2 className='h1 fw-light pb-4'>Page not found</h2>
                    <NavLink
                        className='btn rounded-0 px-4 py-3 btn-outline-dark'
                        to='/'
                    >
                        <i className='bi bi-arrow-left' /> &nbsp; Go Back Home
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default PageNotFound;
