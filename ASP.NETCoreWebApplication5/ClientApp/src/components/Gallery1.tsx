import React, {Fragment, useEffect, useState} from "react";
import PhotoGallery from "./PhotoGallery";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTranslation} from "react-i18next";

const Gallery1: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const isMobile = useMediaQuery("(max-width:1024px)");
    const {t} = useTranslation();

    useEffect(() => {
        (async () => {
            const response = await fetch("./data/gallery.json");
            const data = await response.json();
            setData(data);
        })();
    }, []);

    return (
        <div className={"mb-4"} id={"welcome"}>
            {data && data.map((_: any, i: any) => (
                <Fragment key={i}>
                    <div className={"h2"}>{t(_.title)}</div>
                    <PhotoGallery images={_.data}/>
                </Fragment>
            ))}
        </div>
    );
};
export default Gallery1;
