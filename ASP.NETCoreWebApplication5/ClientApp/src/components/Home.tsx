import React, {Fragment, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Services from "./Services";
import {useDispatch} from "react-redux";
import {loading} from "../dataSlice";

export function Home() {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(loading(false));
    }, []);

    return (
        <Fragment>
            <div className={"text-center m-auto"}>

                <section>

                    <div id={"welcome"} className={"ch1 uppercase mt-6 text-center m-auto pt-8"}>
                        "the most luxurious villa on lake como"
                    </div>

                    <div className="divider"/>

                    <article>
                        {/*                    <Trans i18nKey="greeting" values={{name: "aaaa"}}/>*/}
                        {t("welcome1")}
                    </article>

                    <div className="divider"/>

                    <article>
                        {t("welcome1")}
                    </article>

                    <div className="divider"/>

                    <article>
                        {t("welcome1")}
                    </article>

                </section>

                <Services/>

            </div>
        </Fragment>
    );
}
