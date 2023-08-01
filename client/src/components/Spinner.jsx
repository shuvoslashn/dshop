import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';

const Spinner = ({ path = 'login' }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
            navigate(`/${path}`, {
                state: location.pathname,
            });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <div
            className='container d-flex justify-content-center align-items-center flex-column'
            style={{ height: '100vh' }}
        >
            <BounceLoader color='#797979' />
            <h3 className='pt-4'>You don't have access for this page</h3>
            <h5 className='pt-3'>Redirecting to you ${count}sec</h5>
        </div>
    );
};

export default Spinner;
