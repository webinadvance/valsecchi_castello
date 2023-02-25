import React, { useState } from 'react';
import { GridList, GridListTile, GridListTileBar, Modal } from '@mui/material';

const testImages = [
    {
        id: 1,
        thumbnail: 'https://picsum.photos/id/1/200/300',
        original: 'https://picsum.photos/id/1/1200/800',
        title: 'Image 1',
    },
    {
        id: 2,
        thumbnail: 'https://picsum.photos/id/2/200/300',
        original: 'https://picsum.photos/id/2/1200/800',
        title: 'Image 2',
    },
    {
        id: 3,
        thumbnail: 'https://picsum.photos/id/3/200/300',
        original: 'https://picsum.photos/id/3/1200/800',
        title: 'Image 3',
    },
    {
        id: 4,
        thumbnail: 'https://picsum.photos/id/4/200/300',
        original: 'https://picsum.photos/id/4/1200/800',
        title: 'Image 4',
    },
    {
        id: 5,
        thumbnail: 'https://picsum.photos/id/5/200/300',
        original: 'https://picsum.photos/id/5/1200/800',
        title: 'Image 5',
    },
];

const PlayGround = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (item:any) => {
        setSelectedImage(item);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <GridList cols={4}>
                {testImages.map((item) => (
                    <GridListTile key={item.id} onClick={() => handleImageClick(item)}>
                        <img src={item.thumbnail} alt={item.title} />
                        <GridListTileBar title={item.title} />
                    </GridListTile>
                ))}
            </GridList>
            <Modal open={selectedImage !== null} onClose={handleModalClose}>
                <div>
                    {selectedImage && (
                        <img src={selectedImage.original} alt={selectedImage.title} />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default PlayGround;
