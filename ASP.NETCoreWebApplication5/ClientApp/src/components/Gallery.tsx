import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const PreviewContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    '& img': {
        objectFit: 'contain',
        maxHeight: '100%',
        maxWidth: '100%',
    },
});

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: 0,
    right: 0,
});

interface Props {
    images: string[];
}

const PhotoGallery = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState('');
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleClickOpen = (image: string) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedImage('');
        setOpen(false);
    };

    return (
        <Box>
            <ImageList variant="masonry" cols={isMobile ? 1 : 3} gap={8}>
                {props.images.map((image) => (
                    <ImageListItem key={image}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 0,
                                paddingBottom: '100%',
                                background: `url(${image}) no-repeat center center`,
                                cursor: 'pointer',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            onClick={() => handleClickOpen(image)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <PreviewContainer>
                    {selectedImage && (
                        <>
                            <CloseButton onClick={handleClose}>
                                <CloseIcon/>
                            </CloseButton>
                            <img src={selectedImage} alt="Selected"/>
                        </>
                    )}
                </PreviewContainer>
            </Dialog>
        </Box>
    );
};
export default PhotoGallery
