import React from 'react'
import PhotoGallery from './PhotoGallery'

const Gallery1: React.FC = () => {
    const images = [
        "https://picsum.photos/1024/860?random=" + Math.random() + '',
        "https://picsum.photos/1024/2000?random=" + Math.random() + '',
        "https://picsum.photos/2000/860?random=" + Math.random() + '',
        "https://picsum.photos/1024/860?random=" + Math.random() + '',
        "https://picsum.photos/1024/860?random=" + Math.random() + '',
        "https://picsum.photos/1024/400?random=" + Math.random() + ''
    ];

    return (
        <>
            <h2 id={'welcome'}>
                the villa
            </h2>

            <PhotoGallery images={images}/>;

            <h2 className={''}>
                the rooms
            </h2>

        </>
    );
}
export default Gallery1
