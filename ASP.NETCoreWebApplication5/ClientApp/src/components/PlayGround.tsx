import React from 'react';
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images: ReactImageGalleryItem[] = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        originalAlt: 'Image 1',
        description: 'This is image 1',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        originalAlt: 'Image 1',
        description: 'This is image 1',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: 'Image 1',
        description: 'This is image 1',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: 'Image 1',
        description: 'Lumen de peritus secula, consumere usus!',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: 'Image 1',
        description: 'Ascension, afterlife and a united body of light!',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: 'Image 1',
        description: 'This is image 1',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: 'Image 1',
        description: 'This is image 1',
    },
];

const PlayGround: React.FC = () => {
    return (
        <>
            <h2 className={""}>
                the villa
            </h2>

            <div className="w-full py-8 h-full flex justify-center items-center">
                <div className="w-full sm:max-w-4xl">
                    <ImageGallery items={images}/>
                </div>
            </div>

            <h2 className={""}>
                the villa 2
            </h2>

            <div className="w-full py-8 h-full flex justify-center items-center">
                <div className="w-full sm:max-w-4xl">
                    <ImageGallery items={images}/>
                </div>
            </div>

        </>
    );
};

export default PlayGround;
