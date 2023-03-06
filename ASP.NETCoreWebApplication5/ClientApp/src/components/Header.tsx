import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import React from "react";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {RootState} from "../Store";

const Header = () => {
    const location = useLocation();
    const state = useSelector((state: RootState) => state.data);

    function getComponent(location: any) {
        const matchingRoute = state.routes.find((route: any) => route.key.startsWith(location.pathname));
        switch (true) {
            case matchingRoute?.type == "video":
                return <video
                    className="videobg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source
                        src={matchingRoute?.media}
                        type="video/mp4"
                    />
                </video>;
            case matchingRoute?.type == "img":
                return <Box
                    sx={{
                        backgroundImage: `url(${matchingRoute?.media})`,
                        position: 'relative',
                        zIndex: 2,
                        transition: '1s opacity',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                </Box>;
            default:
                return null;
        }
    }

    return (
        <div id="headerarea" className="relative">
            <div className="absolute z-10 uppercase w-full p-4 lg:p-10">
                <Navbar/>
            </div>

            {getComponent(location)}

            <div>
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="cursor-pointer opacity-75 absolute bottom-0 mb-4 -translate-x-1/2 left-1/2 z-10"
                    color="white"
                    size="2x"
                />
            </div>
        </div>
    );
}

export default Header;
