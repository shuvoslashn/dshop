import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const CreateService = () => {
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
