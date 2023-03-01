import React, {Fragment, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Services from "./Services";
import {useDispatch} from "react-redux";

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
                        {[...Array(100)].filter((_, i) => t(`welcome${i + 1}`) !== `welcome${i + 1}`).map((_, i, arr) => (
                            <Fragment key={i}>
                                <div>{t(`welcome${i + 1}`)}</div>
                                {i !== arr.length - 1 && <div className="divider"/>}
                            </Fragment>
                        ))}
                    </article>

                </section>

                <Services/>

            </div>
        </Fragment>
    );
}
