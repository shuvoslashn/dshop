import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.jsx';
import App from './App.jsx';
import './index.css';
import { SearchProvider } from './context/search.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <SearchProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SearchProvider>
    </AuthProvider>
);
