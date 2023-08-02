import { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');

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
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong in getting category`);
        }
    };

    // update handle
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName('');
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong`);
        }
    };

    // delete handle
    const handleDelete = async (sId) => {
        const dc = confirm('Are you sure?');
        if (dc) {
            try {
                const { data } = await axios.delete(
                    `${
                        import.meta.env.VITE_REACT_API_URL
                    }/api/v1/category/delete-category/${sId}`
                );
                if (data.success) {
                    toast.success(`category is deleted`);
                    getAllCategory();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(`Something went wrong`);
            }
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
                        <div className='p-3 px-5 pt-4 mb-5 shadow-lg'>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                                btnName={'Add New Category'}
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
                                            <td className='table-slug'>
                                                {c.slug}
                                            </td>
                                            <td>
                                                <div className='d-flex gap-3'>
                                                    <button
                                                        className='btn small edit-btn'
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(
                                                                c.name
                                                            );
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className='btn small delete-btn'
                                                        onClick={() =>
                                                            handleDelete(c._id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ant design modal for edit */}
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            open={visible}
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                                btnName={'Update Category'}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
