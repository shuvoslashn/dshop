import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';

const Profile = () => {
    // context
    const [auth, setAuth] = useAuth();

    // context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    // form handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_REACT_API_URL}/api/v1/auth/profile`,
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                }
            );
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <Layout title='Profile - Helper'>
            <div className='container py-5'>
                <div className='row justify-content-between'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 py-xl-3 py-5 px-md-0 px-5'>
                        <div className='d-flex justify-content-center'>
                            <div className='w-75 w-md-100 shadow-lg p-5'>
                                <h3 className='pb-3'>Update Profile</h3>
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
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
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
                                            disabled
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
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
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='btn btn-outline-dark rounded-0 px-4 py-2 mt-3'
                                    >
                                        Update Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
