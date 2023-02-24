import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import './custom.css';
import Navbar from "./components/Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {Home} from "./components/Home";
import {Counter} from "./components/Counter";
import {matchRoutes, useLocation} from "react-router-dom"
import Footer from "./components/Footer";
import {routes} from "./Globals";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {makeStyles} from "@material-ui/core/styles";
import {useCookies} from 'react-cookie';
import i18n from "i18next";

export default function App() {
    
    const location = useLocation();

    const [cookies, setCookie] = useCookies(['preferredLanguage']);
    const [preferredLanguage] = useState<string>(cookies.preferredLanguage || 'en');

    const useStyles = makeStyles((theme) => ({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        button: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    }));

    useEffect(() => {
        setCookie('preferredLanguage', preferredLanguage, {path: '/'});
        i18n.changeLanguage(preferredLanguage);
    }, [preferredLanguage, setCookie]);

    const classes = useStyles();
    const [showButton, setShowButton] = useState(false);
    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleScroll = () => {
        if (window.scrollY > 1) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
                {(location.pathname.startsWith("/gallery")) &&
                    <div style={{backgroundImage: "url('https://picsum.photos/2000/2000')"}}
                         className={"headerbg bg-center bg-cover bg-no-repea h-100 w-100"}>
                    </div>
                }

                <a href="#welcome">
                    <FontAwesomeIcon icon={faArrowDown}
                                     className={"cursor-pointer opacity-75 absolute bottom-0 mb-4 -translate-x-1/2 left-1/2 z-10"}
                                     color={"white"}
                                     size={"2x"}/>
                </a>

            </div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {routes.map((x, i) => {
                    return (
                        <Route key={i} path={x.key} element={x.element}/>
                    )
                })}
                <Route path="/villa" element={<Counter/>}/>
            </Routes>

            <Footer/>

            <Zoom in={showButton}>
                <div onClick={handleClick} role="presentation" className={classes.root}>
                    <Fab className={classes.button} size="small">
                        <KeyboardArrowUpIcon/>
                    </Fab>
                </div>
            </Zoom>

        </Fragment>
    );
}

App.displayName = App.name
