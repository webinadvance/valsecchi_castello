import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import React from "react";
import Box from "@mui/material/Box";

const Header = () => {
    const location = useLocation();

    function getComponent(location: any) {
        switch (true) {
            case location.pathname.startsWith('/home'):
            case location.pathname === '/':
                return <video
                    className="videobg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source
                        src="https://s3.amazonaws.com/uploads.serenohotels.com/app/uploads/2016/08/09220547/Villa-Pliniana-Descriptivo-v3_low.mp4"
                        type="video/mp4"
                    />
                </video>;
            case location.pathname.startsWith('/gallery'):
                return <Box
                    sx={{
                        backgroundImage: "url('https://picsum.photos/2000/2000')",
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

            <a href="#welcome">
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="cursor-pointer opacity-75 absolute bottom-0 mb-4 -translate-x-1/2 left-1/2 z-10"
                    color="white"
                    size="2x"
                />
            </a>
        </div>
    );
}

export default Header;
