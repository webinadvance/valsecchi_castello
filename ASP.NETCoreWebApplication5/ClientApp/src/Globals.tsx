import {Counter} from "./components/Counter";
import {Home} from "./components/Home";
import React, {HTMLProps} from "react";
import Gallery from "./components/Gallery";
import {Gallery1} from "./components/Gallery1";

export const routes = [
    {key: "", title: "home"},
    {key: "gallery", title: "h_gallery", element: <Gallery1/>},
    {key: "villa", title: "h_villa"},
    {
        key: "accommodation",
        title: "accommodation"
    },
    {key: "facilities", title: "facilities"},
    {key: "wedding & events", title: "events"},]