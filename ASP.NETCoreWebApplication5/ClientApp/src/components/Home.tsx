import React, {Fragment, useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from 'react-i18next';
import {Trans} from 'react-i18next'
import data from '../translations.json';
import {T} from "../i18n";

export function Home() {

    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();

    const {i18n} = useTranslation();

    useEffect(() => {
        //i18n.changeLanguage('it');
    }, []);

    return (
        <Fragment>
            <div className={"text-center"}>
                <div className={"text-4xl font-light text-gray-700"}>
                    "THE MOST LUXURIOUS VILLA ON LAKE COMO"
                </div>
                <div>
                    {/*                    <Trans i18nKey="greeting" values={{name: "aaaa"}}/>*/}
                    {t("greeting")}
                </div>
            </div>

        </Fragment>);
}
