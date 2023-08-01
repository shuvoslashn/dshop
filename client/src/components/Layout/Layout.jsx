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
    title: 'Helper - on demand home service',
    description: 'mern stack on demand home service project',
    keywords: 'mern stack, helper, node js, express js, mongodb',
    author: 'Shuvo Sarker',
};

export default Layout;
