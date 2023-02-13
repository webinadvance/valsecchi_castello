import React, {Fragment, useState} from 'react';
import Navbar from "./Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCoffee} from "@fortawesome/free-solid-svg-icons";

export function Home() {

    const [isOpen, setIsOpen] = useState(false);

    return (<Fragment>
        <div id={"headerarea"} className={"relative"}>
            <div className={"absolute z-10 uppercase w-full p-10"}>
                <Navbar/>
            </div>
            <video id={"videoblog"} autoPlay loop muted playsInline preload="metadata" id="videobg">
                <source
                    src="https://s3.amazonaws.com/uploads.serenohotels.com/app/uploads/2016/08/09220547/Villa-Pliniana-Descriptivo-v3_low.mp4"
                    type="video/mp4"/>
            </video>
        </div>
        <div className={"text-center"}>
            <div className={"text-4xl font-light text-gray-700"}>
                "THE MOST LUXURIOUS VILLA ON LAKE COMO"
            </div>
        </div>

    </Fragment>);
}
