import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout>
            <div className='container py-5'>
                <h1>Home Page</h1>
                <pre>{JSON.stringify(auth, null, 4)}</pre>
            </div>
        </Layout>
    );
};

export default HomePage;
