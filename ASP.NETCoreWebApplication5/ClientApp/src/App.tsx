import React, {Fragment, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import './custom.css';
import Navbar from "./components/Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {Home} from "./components/Home";
import {Counter} from "./components/Counter";
import {matchRoutes, useLocation} from "react-router-dom"

export default function App() {

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        /*        console.log(location);*/
    }, []);

    return (
        <Fragment>
            <div id={"headerarea"} className={"relative"}>
                <div className={"absolute z-10 uppercase w-full p-4 lg:p-10"}>
                    <Navbar/>
                </div>

                {(location.pathname.startsWith("/home") || location.pathname == "/") &&
                    <video id={"videobg"} autoPlay loop muted playsInline preload="metadata">
                        <source
                            src="https://s3.amazonaws.com/uploads.serenohotels.com/app/uploads/2016/08/09220547/Villa-Pliniana-Descriptivo-v3_low.mp4"
                            type="video/mp4"/>
                    </video>
                }
                {(location.pathname.startsWith("/villa")) &&
                    <div style={{backgroundImage: "url('https://picsum.photos/2000/2000')"}}
                         className={"headerbg bg-center bg-cover bg-no-repea h-100 w-100"}>
                    </div>
                }

                <FontAwesomeIcon icon={faArrowDown}
                                 className={"cursor-pointer opacity-75 absolute bottom-0 mb-4 -translate-x-1/2 left-1/2 z-10"}
                                 color={"white"}
                                 size={"2x"}
                                 onClick={() => setIsOpen(!isOpen)}/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/villa" element={<Counter/>}/>
            </Routes>
        </Fragment>
    );
}

App.displayName = App.name
