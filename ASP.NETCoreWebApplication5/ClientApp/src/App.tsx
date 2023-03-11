import React, {type FC, lazy, memo, Suspense, useCallback, useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useCookies} from 'react-cookie'
import {Route, Routes, useMatch} from 'react-router-dom'
import i18n from 'i18next'

import './custom.css'
import {type IRoute, routes, user} from './dataSlice'
import {type RootState} from './Store'
import Api from './Api'
import useAsyncEffect from 'use-async-effect'
import loadable from '@loadable/component'
import ScrollTop from "./components/ScrollTop";
import CookieConsentBanner from "./components/CookieConsentBanner ";

const Admin = lazy(async () => await import('./components/Admin'))
const Home = lazy(async () => await import('./components/Home'))
const Footer = lazy(async () => await import('./components/Footer'))
const Header = lazy(async () => await import('./components/Header'))
const Loader = lazy(async () => await import('./components/Loader'))

interface IProps {
}

const App: FC<IProps> = memo(() => {
    const [cookie, setCookie] = useCookies(['preferredLanguage'])
    const [language, setLanguage] = useState<string>(cookie.preferredLanguage ?? 'en')
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false)
    const dispatch = useDispatch()
    const isAdminPage = useMatch('/admin')
    const state = useSelector((state: RootState) => state.data)

    const scrollToTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])


    useEffect(() => {
        (async () => {
            const response = await fetch('./data/routes.json')
            const data = await response.json()
            dispatch(routes(data))
        })()
    }, [])

    useEffect(() => {
        setCookie('preferredLanguage', language, {path: '/'})
        i18n.changeLanguage(language)
    }, [language, setCookie])

    useAsyncEffect(
        async () => {
            const response = await Api.user()
            dispatch(user(response))
        },
        [dispatch]
    );

    const header = useMemo(() => (isAdminPage == null) && <Header/>, [isAdminPage])
    const footer = useMemo(() => (isAdminPage == null) && <Footer/>, [isAdminPage])

    const LoadablePage = loadable(async (props: any) => await import(`./components/${props.page}`), {
        fallback: <div>Page is Loading...</div>,
        cacheKey: (props) => props.page
    })

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <div id={"back-to-top-anchor"}></div>
                {header}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {state.routes.map((route: IRoute, index: any) => (
                        <Route key={index} path={route.key} element={<LoadablePage page={route.element}/>}/>
                    ))}
                    <Route path="/admin" element={<Admin/>}/>
                </Routes>
                {footer}
                <ScrollTop/>
                <Loader/>
                <CookieConsentBanner/>
            </Suspense>
        </>
    );
})

export default App
