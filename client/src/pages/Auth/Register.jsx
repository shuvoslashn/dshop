import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // form handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/api/v1/auth/register`,
                {
                    name,
                    email,
                    phone,
                    address,
                    answer,
                    password,
                }
            );
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <Layout title='Register - Helper'>
            <div className='container py-3'>
                <div className='row align-items-center justify-content-between'>
                    <div className='col-md-6'>
                        <img
                            src='https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5598.jpg?w=740&t=st=1690785011~exp=1690785611~hmac=f3963a1702635ce61a45f89fff38ed8421af6eaea3f18e2f78bd8984de0a5f52'
                            alt=''
                            className='img-fluid'
                        />
                    </div>
                    <div className='col-md-4 py-xl-3 py-5 px-md-0 px-5'>
                        <h3 className='pb-3'>Register User</h3>
                        <form onSubmit={handleSubmit}>
                            {/* for name */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='InputName'
                                    className='form-label'
                                >
                                    Name
                                </label>
                                <input
                                    type='text'
                                    className='form-control  rounded-0'
                                    id='InputName'
                                    pattern='[A-Za-z\s]*'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            {/* for email */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='InputEmail'
                                    className='form-label'
                                >
                                    Email Address
                                </label>
                                <input
                                    type='email'
                                    className='form-control  rounded-0'
                                    id='InputEmail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {/* for Phone */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='InputPhone'
                                    className='form-label'
                                >
                                    Phone
                                    <span style={{ fontSize: '12px' }}>
                                        ( 11 digit )
                                    </span>
                                </label>
                                <input
                                    type='text'
                                    className='form-control  rounded-0'
                                    id='InputPhone'
                                    pattern='[0-9+]{11}'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            {/* for address */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='InputAdress'
                                    className='form-label'
                                >
                                    Address
                                </label>
                                <input
                                    type='text'
                                    className='form-control  rounded-0'
                                    id='InputAdress'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            {/* for answer */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='InputAnswer'
                                    className='form-label'
                                >
                                    Favourite Sport{' '}
                                    <span style={{ fontSize: '12px' }}>
                                        ( Remember for reset pass )
                                    </span>
                                </label>
                                <input
                                    type='text'
                                    className='form-control  rounded-0'
                                    id='InputAnswer'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    required
                                />
                            </div>
                            {/* for password */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='InputPassword'
                                    className='form-label'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    className='form-control rounded-0'
                                    id='InputPassword'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-outline-dark rounded-0 px-4 py-2 mt-3'
                            >
                                Register Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
