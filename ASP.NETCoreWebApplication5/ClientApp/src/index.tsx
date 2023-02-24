import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from "./App";
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

const baseUrl = document.getElementsByTagName('base')[0]?.getAttribute('href') ?? '';
const rootElement = document.getElementById('root') as any;
const root = createRoot(rootElement);

root.render(
    <BrowserRouter basename={baseUrl}>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </BrowserRouter>);