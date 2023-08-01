import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title='Admin Dashboard - Helper'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card p-5 rounded-0'>
                            <h3>Admin Info</h3>
                            <p>------</p>
                            <div className='admin-info'>
                                <p>
                                    <i className='bi bi-person-fill me-2'></i>
                                    <b>Admin Name :</b> {auth?.user?.name}
                                </p>
                                <p>
                                    <i className='bi bi-envelope-fill me-2'></i>
                                    <b>Admin Email :</b> {auth?.user?.email}
                                </p>
                                <p>
                                    <i className='bi bi-telephone-fill me-2'></i>
                                    <b>Admin Phone :</b> {auth?.user?.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
