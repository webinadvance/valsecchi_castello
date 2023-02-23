import React, {useState} from "react";

interface ImageModalProps {
    image: {
        src: string;
    };
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({image, onClose}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-gray-900 opacity-50 cursor-pointer"
                onClick={onClose}
            ></div>
            <div className="relative">
                <img src={image.src}/>
                <button
                    className="absolute top-0 right-0 m-4 p-2 text-white bg-gray-900 rounded-full cursor-pointer"
                    onClick={onClose}
                >
                    X
                </button>
            </div>
        </div>
    );
};

interface Image {
    src: string;
}

interface GalleryProps {
    images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({images}) => {
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    const handleImageClick = (image: Image) => {
        setSelectedImage(image);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    return (
        <div className={"px-4 max-w-4xl text-center m-auto"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, i) => (
                    <div key={i}>
                        <div
                            className="relative overflow-hidden bg-no-repeat bg-center bg-cover cursor-pointer w-full transition-transform duration-300 transform hover:scale-110"
                            style={{backgroundImage: `url(${image.src})`, height: "0", paddingBottom: "100%"}}
                            onClick={() => handleImageClick(image)}
                        />
                    </div>
                ))}
                {selectedImage && (
                    <ImageModal image={selectedImage} onClose={handleModalClose}/>
                )}
            </div>
        </div>
    );
};

export default Gallery;
