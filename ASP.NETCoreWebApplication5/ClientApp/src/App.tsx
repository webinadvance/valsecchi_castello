import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Layout} from './components/Layout';
import './custom.css';
export default function App() {
    return (
        <Routes>
            {AppRoutes.map((route: any, index: any) => {
                const {element, ...rest} = route;
                return <Route key={index} {...rest} element={element}/>;
            })}
        </Routes>
    );
}

App.displayName = App.name
