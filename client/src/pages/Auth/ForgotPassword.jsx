import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    // form handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/auth/forgot-password`,
                {
                    email,
                    newPassword,
                    answer,
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
            toast.error('Email or Answer not correct');
        }
    };

    return (
        <Layout title='Reset Passowrd - Helper'>
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
                        <h3 className='pb-3'>Reset Password</h3>
                        <form onSubmit={handleSubmit}>
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
                            {/* for answer */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='InputAnswer'
                                    className='form-label'
                                >
                                    Answer the question
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
                                    htmlFor='InputNewPassword'
                                    className='form-label'
                                >
                                    New Password
                                </label>
                                <input
                                    type='password'
                                    className='form-control rounded-0'
                                    id='InputNewPassword'
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className='d-flex gap-3 pt-3'>
                                <button
                                    type='submit'
                                    className='btn btn-dark rounded-0 px-4 py-2'
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
