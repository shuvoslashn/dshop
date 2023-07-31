import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet';

const Layout = (props) => {
    return (
        <>
            <Helmet>
                <meta name='description' content={props.description} />
                <meta name='keywords' content={props.keywords} />
                <meta name='author' content={props.author} />
                <title>{props.title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '71.3vh' }}>{props.children}</main>
            <Footer />
        </>
    );
};

Layout.defaultProps = {
    title: 'dshop.com',
    description: 'mern stack project',
    keywords: 'mern stack, ecommerce, node js, express js, mongodb',
    author: 'Shuvo Sarker',
};

export default Layout;
