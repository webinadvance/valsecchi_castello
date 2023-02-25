import React from "react";
import {Gallery1} from "./components/Gallery1";
import BasicImageList from "./components/PlayGround";

export const routes = [
    {key: "", title: "home"},
    {key: "gallery", title: "h_gallery", element: <Gallery1/>},
    {key: "playground", title: "t_playground", element: <BasicImageList/>},
    {key: "villa", title: "h_villa"},
    {
        key: "accommodation",
        title: "accommodation"
    },
    {key: "facilities", title: "facilities"},
    {key: "wedding & events", title: "events"},]