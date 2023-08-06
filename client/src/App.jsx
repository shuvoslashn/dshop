import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/User/Dashboard';
import { PrivateRoute } from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { AdminRoute } from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateService from './pages/Admin/CreateService';
import Users from './pages/Admin/Users';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';
import UpdateService from './pages/Admin/UpdateService';
import Services from './pages/Admin/Services';
import Search from './pages/Search';
import ServiceDetails from './pages/ServiceDetails';
import CategoryServices from './pages/CategoryServices';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
    return (
        <>
            <ToastContainer position='bottom-right' autoClose='1500' />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/service/:slug' element={<ServiceDetails />} />
                <Route path='/category/:slug' element={<CategoryServices />} />
                <Route path='/search' element={<Search />} />
                <Route path='/cart' element={<CartPage />} />

                {/* User Routes */}
                <Route path='/dashboard' element={<PrivateRoute />}>
                    <Route path='user' element={<Dashboard />} />
                    <Route path='user/orders' element={<Orders />} />
                    <Route path='user/profile' element={<Profile />} />
                </Route>

                {/* Admin Routes */}
                <Route path='/dashboard' element={<AdminRoute />}>
                    <Route path='admin' element={<AdminDashboard />} />
                    <Route
                        path='admin/create-category'
                        element={<CreateCategory />}
                    />
                    <Route
                        path='admin/create-service'
                        element={<CreateService />}
                    />
                    <Route
                        path='admin/services/:slug'
                        element={<UpdateService />}
                    />
                    <Route path='admin/services' element={<Services />} />
                    <Route path='admin/orders' element={<AdminOrders />} />
                    <Route path='admin/users' element={<Users />} />
                </Route>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/policy' element={<Policy />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
