import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/Layout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    // form handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phone, address, password);
        toast.success('Registration successful');
    };

    return (
        <Layout title='Register - Dshop.com'>
            <div className='container py-3'>
                <div className='row align-items-center justify-content-between'>
                    <div className='col-md-6'>
                        <img
                            src='https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5598.jpg?w=740&t=st=1690785011~exp=1690785611~hmac=f3963a1702635ce61a45f89fff38ed8421af6eaea3f18e2f78bd8984de0a5f52'
                            alt=''
                            className='img-fluid'
                        />
                    </div>
                    <div className='col-md-4 py-xl-0 py-5 px-md-0 px-5'>
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
                                </label>
                                <input
                                    type='text'
                                    className='form-control  rounded-0'
                                    id='InputPhone'
                                    pattern='[0-9+]{11}'
                                    placeholder='11 digit phone number'
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
                                className='btn btn-outline-dark rounded-0 px-4 py-2'
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
