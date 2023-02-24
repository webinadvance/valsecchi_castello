import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import Services from "./Services";

export function Home() {
    const {t} = useTranslation();

    return (
        <Fragment>
            <div className={"text-center m-auto"}>
                <div className={"px-4 max-w-4xl text-center m-auto"}>
                    <div id={"welcome"} className={"ch1 uppercase mt-6 text-center m-auto pt-8"}>
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
        </Fragment>
    );
}
