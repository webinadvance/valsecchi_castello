import React from "react";
import {Gallery1} from "./components/Gallery1";
import {Facilities} from "./components/Facilities";
import PlayGround from "./components/PlayGround";

export const routes = [
    {key: "", title: "home"},
    {key: "gallery", title: "h_gallery", element: <Gallery1/>},
    {key: "playground", title: "t_playground", element: <PlayGround/>},
    {key: "facilities", title: "t_facilities", element: <Facilities/>}
]