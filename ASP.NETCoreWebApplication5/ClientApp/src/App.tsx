import React, {Fragment, useEffect, useState} from 'react';
import {Route, Routes, useMatch} from 'react-router-dom';
import './custom.css';
import {Home} from "./components/Home";
import Footer from "./components/Footer";
import {routes} from "./Globals";
import {useCookies} from 'react-cookie';
import i18n from "i18next";
import {Header} from "./components/Header";
import {makeStyles} from '@mui/styles';
import {Fab, Zoom} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Admin from "./components/Admin";

export default function App() {

    const [cookies, setCookie] = useCookies(['preferredLanguage']);
    const [preferredLanguage] = useState<string>(cookies.preferredLanguage || 'en');

    const useStyles = makeStyles((theme: any) => ({
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

    const match = useMatch("/admin");

    return (
        <Fragment>

            {!match && <Header/>}

            <Routes>
                <Route path="/" element={<Home/>}/>
                {routes.map((x, i) => {
                    return (
                        <Route key={i} path={x.key} element={x.element}/>
                    )
                })}
                <Route path={"/admin"} element={<Admin/>}/>
            </Routes>

            {!match && <Header/>}

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
