import {useEffect, useState} from 'react';
import {Route, Routes, useMatch} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@mui/styles';
import {Fab, Theme, Zoom} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import i18n from 'i18next';

import './custom.css';

import {routes} from './Globals';
import Api from './Api';
import {RootState} from './Store';
import {user} from './dataSlice';

import Footer from './components/Footer';
import Header from './components/Header';
import Admin from './components/Admin';
import Home from './components/Home';
import Loader from './components/Loader';

export default function App() {
    const [cookies, setCookie] = useCookies(['preferredLanguage']);
    const [preferredLanguage, setPreferredLanguage] = useState(
        cookies.preferredLanguage || 'en'
    );

    const useStyles = makeStyles((theme: Theme) => ({
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
    const classes = useStyles();

    const [showButton, setShowButton] = useState(false);
    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    const handleScroll = () => {
        setShowButton(window.scrollY > 1);
    };

    useEffect(() => {
        setCookie('preferredLanguage', preferredLanguage, {path: '/'});
        i18n.changeLanguage(preferredLanguage);
    }, [preferredLanguage, setCookie]);

    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.data.user);
    useEffect(() => {
        const getUser = async () => {
            const res = await Api.user();
            dispatch(user(res));
        };
        getUser();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch]);

    const isMatch = useMatch('/admin');
    const header = !isMatch && <Header/>;
    const footer = !isMatch && <Footer/>;

    return (
        <>
            {header}
            <Routes>
                <Route path="/" element={<Home/>}/>
                {routes.map(({key, element}, i) => (
                    <Route key={i} path={key} element={element}/>
                ))}
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
            {footer}
            <Zoom in={showButton}>
                <div onClick={handleClick} role="presentation" className={classes.root}>
                    <Fab className={classes.button} size="small">
                        <KeyboardArrowUpIcon/>
                    </Fab>
                </div>
            </Zoom>
            <Loader/>
        </>
    );
}

App.displayName = App.name;
