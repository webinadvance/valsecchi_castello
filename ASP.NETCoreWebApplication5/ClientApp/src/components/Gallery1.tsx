import React, {Fragment, useEffect, useState} from "react";
import PhotoGallery from "./PhotoGallery";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

const Gallery1: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const isMobile = useMediaQuery('(max-width:1024px)');

    useEffect(() => {
        (async () => {
            const response = await fetch("./data/gallery.json");
            const data = await response.json();
            setData(data);
        })();
    }, []);

    return (
        <Box sx={{maxWidth: isMobile ? "99vw" : "60vw", margin: "0 auto"}}>
            {data && data.map((_: any, i: any) => (
                <Fragment key={i}>
                    <h2>{_.title}</h2>
                    <PhotoGallery images={_.data}/>
                </Fragment>
            ))}
        </Box>
    );
};
export default Gallery1;
