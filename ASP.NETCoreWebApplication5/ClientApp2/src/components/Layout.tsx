import React, {ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout(props: LayoutProps) {
    return (
        <div>
            {/*<NavMenu/>*/}
            <main>
                {props.children}
            </main>
        </div>
    );
}

Layout.displayName = Layout.name;