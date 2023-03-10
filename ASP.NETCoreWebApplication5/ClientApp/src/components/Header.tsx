import {useLocation} from 'react-router-dom'
import Navbar from './Navbar'
import React from 'react'
import Box from '@mui/material/Box'
import {useSelector} from 'react-redux'
import {type RootState} from '../Store'
import ScrollToWelcome from './ScrollToWelcome'
import {type IRoute} from '../dataSlice'

const Header: React.FC = () => {
    const location = useLocation()
    const state = useSelector((state: RootState) => state.data)

    function getBackground(location: { pathname: string }): JSX.Element | null {
        const matchingRoute = state.routes.find((route: IRoute) => route.key.startsWith(location.pathname))
        switch (true) {
            case matchingRoute?.type === 'video':
                return (
                    <video
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
                    </video>
                );
            case matchingRoute?.type === 'img':
                return (
                    <Box
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
                    </Box>
                );
            default:
                return null
        }
    }

    return (
        <div id="headerarea" className="relative">
            <div className="absolute z-10 uppercase w-full p-4 lg:p-10">
                <Navbar/>
            </div>
            {getBackground(location)}
            <ScrollToWelcome/>
        </div>
    );
}

export default Header
