import {Counter} from "./components/Counter";
import {Home} from "./components/Home";
import React, {HTMLProps} from "react";
import Gallery from "./components/Gallery";
import {Gallery1} from "./components/Gallery1";

export const routes = [
    {key: "", title: "home"},
    {key: "gallery", title: "gallery", element: <Gallery1/>},
    {key: "villa", title: "villa"},
    {
        key: "accommodation",
        title: "accommodation"
    },
    {key: "facilities", title: "facilities"},
    {key: "wedding & events", title: "events"},]

export function H2(props: HTMLProps<HTMLElement>) {
    return (
        <div className="font-raleway font-medium text-base md:text-lg font-bold text-gray-700 tracking-wider leading-1.3 text-center uppercase py-2 px-4 md:px-6 bg-white block mx-auto my-40">
            {props.children}
        </div>
    )
}