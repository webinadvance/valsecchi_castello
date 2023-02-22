import React, {Fragment, useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from 'react-i18next';
import {Trans} from 'react-i18next'
import data from '../translations.json';
import {T} from "../i18n";
import Footer from "./Footer";
import Services from "./Services";
import {Map} from "./Map";

export function Home() {

    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();

    const {i18n} = useTranslation();

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
                
                <Map/>

            </div>

        </Fragment>
    );
}
