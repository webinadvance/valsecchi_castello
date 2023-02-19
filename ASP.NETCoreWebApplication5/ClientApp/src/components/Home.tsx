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
            <div id={"headerarea"} className={"relative"}>
                <div className={"absolute z-10 uppercase w-full p-4 lg:p-10"}>
                    <Navbar/>
                </div>
                <video id={"videobg"} autoPlay loop muted playsInline preload="metadata">
                    <source
                        src="https://s3.amazonaws.com/uploads.serenohotels.com/app/uploads/2016/08/09220547/Villa-Pliniana-Descriptivo-v3_low.mp4"
                        type="video/mp4"/>
                </video>
                <FontAwesomeIcon icon={faArrowDown}
                                 className={"cursor-pointer opacity-75 absolute bottom-0 mb-4 -translate-x-1/2 left-1/2 z-10"}
                                 color={"white"}
                                 size={"2x"}
                                 onClick={() => setIsOpen(!isOpen)}/>
            </div>
            <div className={"text-center"}>
                <div className={"text-4xl font-light text-gray-700"}>
                    "THE MOST LUXURIOUS VILLA ON LAKE COMO"
                </div>
                {/*             <div>
                    <Trans i18nKey="greeting" values={{name: "aaaa"}}/>
                </div>*/}
                <div>
                    {T("hello PIPO")}
                </div>
            </div>

        </Fragment>);
}
