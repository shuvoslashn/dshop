import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

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
                    <Link className='navbar-brand' to={'/'}>
                        Navbar
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
                                    <li className='nav-item'>
                                        <NavLink
                                            className='nav-link'
                                            to={'/register'}
                                        >
                                            {auth.user.name}
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink
                                            className='nav-link'
                                            to={'/login'}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </NavLink>
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
