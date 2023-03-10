import React, {Fragment, useEffect, useState} from "react";
import PhotoGallery from "./PhotoGallery";

const Gallery1: React.FC = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("./data/gallery.json");
            const data = await response.json();
            setData(data);
        })();
    }, []);

    return (
        <>
            {data && data.map((_: any, i: any) => (
                <Fragment key={i}>
                    <h2>{_.title}</h2>
                    <PhotoGallery images={_.data}/>
                </Fragment>
            ))}
        </>
    );
};

export default Gallery1;
