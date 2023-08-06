import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className='list-group rounded-0'>
                <NavLink
                    to='/dashboard/admin/'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-speedometer me-2' />
                    Dashboard
                </NavLink>
                <NavLink
                    to='/dashboard/admin/create-category'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-pencil-square me-2' />
                    Create Category
                </NavLink>
                <NavLink
                    to='/dashboard/admin/create-service'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-database-add me-2' />
                    Create Services
                </NavLink>
                <NavLink
                    to='/dashboard/admin/services'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-database-add me-2' />
                    Services
                </NavLink>
                {/* <NavLink
                    to='/dashboard/admin/users'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-person-plus me-2' />
                    Users
                </NavLink> */}
            </div>
        </>
    );
};

export default AdminMenu;
