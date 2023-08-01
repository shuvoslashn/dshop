import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';

const CreateCategory = () => {
    return (
        <Layout title='Create Category - Admin Dashboard - Helper'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>Create Category</h3>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
