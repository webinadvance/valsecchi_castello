import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useCookies} from 'react-cookie';
import {makeStyles} from '@mui/styles';
import {Fab, Theme, Zoom} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Route, Routes, useMatch} from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import i18n from 'i18next';

import './custom.css';

import Api from './Api';
import {routes} from './Globals';
import {user} from './dataSlice';

import Admin from './components/Admin';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Loader from './components/Loader';

const App = () => {

    const [cookie, setCookie] = useCookies(['preferredLanguage']);
    const [language, setLanguage] = useState(cookie.preferredLanguage || 'en');
    const [showScrollButton, setShowScrollButton] = useState(false);

    const dispatch = useDispatch();
    const isAdminPage = useMatch('/admin');

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleScroll = () => {
        setShowScrollButton(window.scrollY > 1);
    };

    const useStyles = makeStyles((theme: Theme) => ({
        scrollButton: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        fabButton: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        setCookie('preferredLanguage', language, {path: '/'});
        i18n.changeLanguage(language);
    }, [language, setCookie]);

    useAsyncEffect(async () => {
        const response = await Api.user();
        dispatch(user(response));
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch]);

    const header = !isAdminPage && <Header/>;
    const footer = !isAdminPage && <Footer/>;

    return (
        <>
            {header}
            <Routes>
                <Route path="/" element={<Home/>}/>
                {routes.map(({key, element}, index) => (
                    <Route key={index} path={key} element={element}/>
                ))}
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
            {footer}
            <Zoom in={showScrollButton}>
                <div onClick={scrollToTop} role="presentation" className={classes.scrollButton}>
                    <Fab className={classes.fabButton} size="small">
                        <KeyboardArrowUpIcon/>
                    </Fab>
                </div>
            </Zoom>
            <Loader/>
        </>
    );

}
export default App;
