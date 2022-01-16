import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import { AuthStateProvider } from './Containers/auth';

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
            <AuthStateProvider>
                <App/>
            </AuthStateProvider>
             </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
