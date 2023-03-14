import React from "react";

export function Layout(props: any) {
    return (
        <div>
            <div>
                {props.children}
            </div>
        </div>
    );
}

Layout.displayName = Layout.name;
