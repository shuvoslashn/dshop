import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const CreateService = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');

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

    return (
        <Layout title='Create Service - Admin Dashboard - Helper'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>Create Service</h3>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateService;
