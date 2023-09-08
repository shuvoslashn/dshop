import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
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
        <>
            <header className='header fixed-top'>
                <nav className='navbar navbar-expand-lg'>
                    <div className='container d-flex justify-content-between'>
                        <Link
                            className='navbar-brand fw-bold flex-grow-1 text-center py-2 py-sm-0 text-sm-start'
                            to={'/'}
                        >
                            <i className='bi bi-check-circle-fill me-2 mt-1'></i>
                            HELPER.
                        </Link>
                        <SearchInput />
                        <button
                            className='navbar-toggler ms-3 rounded-0'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarSupportedContent'
                            aria-controls='navbarSupportedContent'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <span className='navbar-toggler-icon' />
                        </button>

                        <div className='collapse navbar-collapse  flex-grow-1' id='navbarSupportedContent'>
                            <ul className='navbar-nav  ms-auto mb-2 mb-lg-0 gap-2 gap-md-4'>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' aria-current='page' to={'/'}>
                                        Home
                                    </NavLink>
                                </li>

                                <>
                                    <li className='nav-item dropdown'>
                                        <Link
                                            className='nav-link dropdown-toggle'
                                            to='#'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            Categories &nbsp;
                                            <i className='bi bi-chevron-down'></i>
                                        </Link>
                                        <ul className='dropdown-menu'>
                                            {categories?.map((c) => (
                                                <li key={c._id}>
                                                    <Link className='dropdown-item' to={`/category/${c.slug}`}>
                                                        {c.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </>

                                {!auth.user ? (
                                    <>
                                        <li className='nav-item'>
                                            <NavLink className='nav-link' to={'/register'}>
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink className='nav-link' to={'/login'}>
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
                                                {auth?.user?.name?.split(' ')[0]} &nbsp;
                                                <i className='bi bi-chevron-down'></i>
                                            </NavLink>
                                            <ul className='dropdown-menu'>
                                                <li>
                                                    <NavLink
                                                        className='dropdown-item'
                                                        to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'} `}
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
                                    <Badge count={cart?.length} showZero>
                                        <NavLink className='nav-link' to={'/cart'}>
                                            <i className='bi bi-bag-fill' />
                                        </NavLink>
                                    </Badge>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className='py-4'></div>
        </>
    );
};

export default Header;
