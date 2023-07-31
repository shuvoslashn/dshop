import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className='bg-dark px-2 py-5 small'>
            <p className='text-center text-white-50 text-light pb-3 h4'>
                All right reserved by &copy; Shuvo Sarker
            </p>
            <ul className='d-flex list-unstyled text-white gap-3 justify-content-center'>
                <li>
                    <NavLink
                        to='/about'
                        className='text-white text-decoration-none'
                    >
                        About us
                    </NavLink>
                </li>
                <li>|</li>
                <li>
                    <NavLink
                        to='/policy'
                        className='text-white text-decoration-none'
                    >
                        Policy
                    </NavLink>
                </li>
                <li>|</li>
                <li>
                    <NavLink
                        to='/contact'
                        className='text-white text-decoration-none'
                    >
                        Contact Us
                    </NavLink>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
