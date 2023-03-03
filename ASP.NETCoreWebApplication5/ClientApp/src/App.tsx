import React, {FC, lazy, memo, Suspense, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from 'react-cookie';
import {createStyles, makeStyles} from '@mui/styles';
import {Fab, Theme, Zoom} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Route, Routes, useMatch} from 'react-router-dom';
import i18n from 'i18next';

import './custom.css';
import {routes} from './dataSlice';
import {RootState} from "./Store";

const Admin = lazy(() => import('./components/Admin'));
const Footer = lazy(() => import('./components/Footer'));
const Header = lazy(() => import('./components/Header'));
const Loader = lazy(() => import('./components/Loader'));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    })
);

interface IProps {
}

const App: FC<IProps> = memo(() => {
    const [cookie, setCookie] = useCookies(['preferredLanguage']);
    const [language, setLanguage] = useState<string>(cookie.preferredLanguage ?? 'en');
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const dispatch = useDispatch();
    const isAdminPage = useMatch('/admin');
    const classes = useStyles();
    const state = useSelector((state: RootState) => state.data);

    const scrollToTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    const handleScroll = useCallback(() => {
        setShowScrollButton(window.scrollY > 1);
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch('./data/routes.json');
            const data = await response.json();
            console.log(data);
            dispatch(routes(data));
        })();
    }, []);

    useEffect(() => {
        setCookie('preferredLanguage', language, {path: '/'});
        i18n.changeLanguage(language);
    }, [language, setCookie]);

    /* useAsyncEffect(
         async () => {
             const response = await Api.user();
             dispatch(user(response));
             window.addEventListener('scroll', handleScroll);
             return () => window.removeEventListener('scroll', handleScroll);
         },
         [dispatch]
     );*/

    const header = useMemo(() => !isAdminPage && <Header/>, [isAdminPage]);
    const footer = useMemo(() => !isAdminPage && <Footer/>, [isAdminPage]);

    const componentCache: any = {};

    function getLazyComponent(name: any) {
        if (!componentCache[name]) {
            componentCache[name] = lazy(() => import(`./components/${name}`));
        }
        return componentCache[name];
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {header}
                <Routes>
                    {state.routes.map((route: any, index: any) => (
                        <Route
                            key={index}
                            path={`/${route.element}`}
                            element={React.createElement(getLazyComponent(route.element))}
                        />
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
            </Suspense>
        </>
    );
});

export default App;
