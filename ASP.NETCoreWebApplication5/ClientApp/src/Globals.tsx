import React from "react";
import {Gallery1} from "./components/Gallery1";
import {Facilities} from "./components/Facilities";
import PlayGround from "./components/PlayGround";

export const routes = [
    {key: "", title: "home"},
    {
        key: "/gallery",
        title: "n_gallery",
        element: <Gallery1/>,
        backgroundImage: "https://picsum.photos/2000/2000"
    },
    {
        key: "/playground",
        title: "n_playground",
        element: <PlayGround/>,
        backgroundImage: "https://picsum.photos/2000/2000"
    },
    {
        key: "/facilities",
        title: "n_facilities",
        element: <Facilities/>,
        backgroundImage: "https://picsum.photos/2000/2000"
    }
]

export const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);