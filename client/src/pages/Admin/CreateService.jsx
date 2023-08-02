import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateService = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [photo, setPhoto] = useState('');

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/category/get-category`
            );
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong in getting category`);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //create service function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const serviceData = new FormData();
            serviceData.append('name', name);
            serviceData.append('description', description);
            serviceData.append('price', price);
            serviceData.append('quantity', quantity);
            serviceData.append('photo', photo);
            serviceData.append('category', category);
            const { data } = axios.post(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/service/create-service`,
                serviceData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success('service Created Successfully');
                navigate('/dashboard/admin/services');
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong');
        }
    };

    return (
        <Layout title='Create Service - Admin Dashboard - Helper'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3 className='pb-3'>Create Service</h3>
                        {/* start service design */}
                        <div className='p-3 px-5 pt-4 mb-5 shadow-lg rounded-0'>
                            <label className='form-label'>
                                Select Category
                            </label>
                            <Select
                                bordered={false}
                                placeholder='Select a category'
                                // showSearch
                                className='form-select mb-3 rounded-0'
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12 rounded-0'>
                                    {photo
                                        ? photo.name
                                        : 'Upload Service Photo'}
                                    <input
                                        type='file'
                                        name='photo'
                                        accept='image/*'
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt='service_photo'
                                            height={'200px'}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Service Name
                                </label>
                                <input
                                    type='text'
                                    value={name}
                                    className='form-control rounded-0'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Service Description
                                </label>
                                <textarea
                                    type='text'
                                    value={description}
                                    className='form-control rounded-0'
                                    rows={3}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>
                                    Service Price
                                </label>
                                <input
                                    type='number'
                                    value={price}
                                    className='form-control rounded-0'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            {/* <div className='mb-3'>
                                <input
                                    type='number'
                                    value={quantity}
                                    placeholder='write a quantity'
                                    className='form-control rounded-0'
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-3'>
                                <Select
                                    bordered={false}
                                    placeholder='Select Shipping '
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div> */}
                            <div className='mb-3'>
                                <button
                                    className='btn btn-dark rounded-0'
                                    onClick={handleCreate}
                                >
                                    Create Service
                                </button>
                            </div>
                        </div>
                        {/* end service design */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateService;
