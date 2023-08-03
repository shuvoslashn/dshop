import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import Dashboard from '../../pages/User/Dashboard';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        });
        localStorage.removeItem('auth');
        toast.success('Logout successful');
    };
    return (
        <header className='header'>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container'>
                    <Link className='navbar-brand fw-bold' to={'/'}>
                        <i className='bi bi-check-circle-fill me-2 mt-1'></i>
                        HELPER.
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon' />
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarSupportedContent'
                    >
                        <ul className='navbar-nav ms-auto mb-2 mb-lg-0 gap-3'>
                            <li className='nav-item'>
                                <NavLink
                                    className='nav-link'
                                    aria-current='page'
                                    to={'/'}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    className='nav-link'
                                    to={'/services'}
                                >
                                    Our Services
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    className='nav-link'
                                    to={'/categories'}
                                >
                                    Categories
                                </NavLink>
                            </li>
                            {!auth.user ? (
                                <>
                                    <li className='nav-item'>
                                        <NavLink
                                            className='nav-link'
                                            to={'/register'}
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink
                                            className='nav-link'
                                            to={'/login'}
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className='nav-item dropdown'>
                                        <NavLink
                                            className='nav-link dropdown-toggle'
                                            to='#'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            {auth?.user?.name?.split(' ')[0]}{' '}
                                            &nbsp;
                                            <i className='bi bi-chevron-down'></i>
                                        </NavLink>
                                        <ul className='dropdown-menu'>
                                            <li>
                                                <NavLink
                                                    className='dropdown-item'
                                                    to={`/dashboard/${
                                                        auth?.user?.role === 1
                                                            ? 'admin'
                                                            : 'user'
                                                    } `}
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <hr className='dropdown-divider' />
                                            </li>
                                            <li>
                                                <NavLink
                                                    className='dropdown-item'
                                                    onClick={handleLogout}
                                                    to={'/login'}
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={'/cart'}>
                                    <i className='bi bi-bag-fill' /> (0)
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
