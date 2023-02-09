import React from 'react';
import {Container} from 'reactstrap';
import {NavMenu} from './NavMenu';

export function Layout(props) {
    return (
        <div>
{/*            <NavMenu/>*/}
            <div tag="main">
                {props.children}
            </div>
        </div>
    );
}

Layout.displayName = Layout.name
