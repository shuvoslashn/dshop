import { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    // handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/category/create-category`,
                { name }
            );
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
                setName('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong in input form`);
        }
    };

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/category/get-category`
            );
            if (data.success) {
                setCategories(data.category);
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
        <Layout title='Create Category - Admin Dashboard - Helper'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3 className='pb-3'>Manage Category</h3>
                        <div className='p-3 px-5 pt-4 mb-3 shadow-lg'>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className=''>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Category Name</th>
                                        <th scope='col'>Category Slug</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>{c.slug}</td>
                                            <td>
                                                <div className='d-flex gap-3'>
                                                    <button className='btn btn-outline-dark small'>
                                                        Edit
                                                    </button>
                                                    <button className='btn btn-outline-danger small'>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
