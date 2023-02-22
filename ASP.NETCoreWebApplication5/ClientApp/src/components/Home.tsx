import React, {Fragment, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Services from "./Services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import {faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons/faAngleDoubleUp";
import smoothscroll from 'smoothscroll-polyfill';

export function Home() {

    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    const [showButton, setShowButton] = useState(false);
    const {i18n} = useTranslation();
    const handleButtonClick = () => {
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

    useEffect(() => {
        //i18n.changeLanguage('it');
    }, []);

    return (
        <Fragment>
            <div className={"text-center m-auto"}>
                <div className={"px-4 max-w-4xl text-center m-auto"}>
                    <div className={"ch1 uppercase mt-6 text-center m-auto pt-8"}>
                        "the most luxurious villa on lake como"
                    </div>

                    <div className="divider"/>
                    <div className={"cp1 text-center"}>
                        {/*                    <Trans i18nKey="greeting" values={{name: "aaaa"}}/>*/}
                        {t("welcome1")}
                    </div>

                    <div className="divider"/>
                    <div className={"cp1 text-center"}>
                        {/*                    <Trans i18nKey="greeting" values={{name: "aaaa"}}/>*/}
                        {t("welcome1")}
                    </div>

                    <div className="divider"/>
                    <div className={"cp1 text-center pb-6"}>
                        {/*                    <Trans i18nKey="greeting" values={{name: "aaaa"}}/>*/}
                        {t("welcome1")}
                    </div>

                </div>

                <Services/>

            </div>
            {showButton &&
                <button
                    className="fixed z-50 bottom-10 right-10 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
                    onClick={handleButtonClick}
                >
                    <FontAwesomeIcon icon={faAngleDoubleUp}/>
                </button>
            }

        </Fragment>
    );
}
