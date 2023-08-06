import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState([
        'Not Process',
        'Processing',
        'Serviceman Working',
        'Service Done',
        'Cancel',
    ]);
    const [changeStatus, setChangeStatus] = useState('');

    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    // get orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_API_URL}/api/v1/auth/all-orders`
            );
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChangeStatus = async (orderId, value) => {
        try {
            const { data } = await axios.put(
                `${
                    import.meta.env.VITE_REACT_API_URL
                }/api/v1/auth/order-status/${orderId}`,
                { status: value }
            );
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title='Admin Orders'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All Orders</h1>
                        <div>
                            {orders?.map((o, i) => {
                                return (
                                    <div className='' key={i}>
                                        <table className='table shadow-lg p-3'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>Orders</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>
                                                        Service orderd
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{++i}</td>
                                                    <td>
                                                        <Select
                                                            bordered={false}
                                                            onChange={(value) =>
                                                                handleChangeStatus(
                                                                    o._id,
                                                                    value
                                                                )
                                                            }
                                                            defaultValue={
                                                                o?.status
                                                            }
                                                        >
                                                            {status.map(
                                                                (s, i) => (
                                                                    <Option
                                                                        key={i}
                                                                        value={
                                                                            s
                                                                        }
                                                                    >
                                                                        {s}
                                                                    </Option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>
                                                        {moment(
                                                            o?.createAt
                                                        ).fromNow()}
                                                    </td>
                                                    <td>
                                                        {o?.payment.amount} /=
                                                    </td>
                                                    <td>
                                                        {o?.services?.length}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='mb-4 pb-4'>
                                            {o?.services?.map((p, i) => (
                                                <div
                                                    className='container p-4 shadow-lg mb-3'
                                                    key={i}
                                                >
                                                    <div className='row'>
                                                        <div className='col-md-3'>
                                                            <img
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_REACT_API_URL
                                                                }/api/v1/service/service-photo/${
                                                                    p._id
                                                                }`}
                                                                className='card-img-top'
                                                                alt={p.name}
                                                            />
                                                        </div>
                                                        <div className='col-md-8'>
                                                            <h4>{p.name}</h4>
                                                            <p className='mb-4'>
                                                                {p.description.slice(
                                                                    0,
                                                                    40
                                                                )}
                                                                ...
                                                            </p>
                                                            <h6>
                                                                Price :{' '}
                                                                <b className='fw-bold'>
                                                                    {p.price}
                                                                </b>
                                                                /=
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;
