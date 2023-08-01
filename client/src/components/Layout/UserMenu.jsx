import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <>
            <div className='list-group rounded-0'>
                <NavLink
                    to='/dashboard/user/'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-speedometer me-2' />
                    Dashboard
                </NavLink>
                <NavLink
                    to='/dashboard/user/profile'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-person-plus me-2' />
                    Profile
                </NavLink>
                <NavLink
                    to='/dashboard/user/orders'
                    className='list-group-item list-group-item-action'
                >
                    <i className='bi bi-pencil-square me-2' />
                    Orders
                </NavLink>
            </div>
        </>
    );
};

export default UserMenu;
