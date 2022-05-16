import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "~slick-carousel/slick/slick.css";
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import {StoreProvider} from './Store'


ReactDOM.render(
    <StoreProvider>
        <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}> {/* vedio: 49 */}
                <App />
            </PayPalScriptProvider>
        </HelmetProvider>
    </StoreProvider>
,document.getElementById('root'));