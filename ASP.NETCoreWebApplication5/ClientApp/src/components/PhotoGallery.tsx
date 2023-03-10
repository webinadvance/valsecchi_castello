import * as React from 'react'
import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Dialog from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from "react-i18next";
import {LazyLoadImage} from 'react-lazy-load-image-component';

const PreviewContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    '& img': {
        objectFit: 'contain',
        maxHeight: '100%',
        maxWidth: '100%'
    },
})

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: 0,
    right: 0
})

const Overline = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
        opacity: 1
    },
    '& span': {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1rem',
        textAlign: 'center'
    },
})

interface Props {
    images: any[]
}

const PhotoGallery = (props: Props) => {
    const [open, setOpen] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState('')
    const isMobile = useMediaQuery('(max-width:1024px)')
    const {t} = useTranslation()
    const handleClickOpen = (image: string) => {
        setSelectedImage(image)
        setOpen(true)
    };

    const handleClose = () => {
        setSelectedImage('')
        setOpen(false)
    };

    return (
        <Box sx={{maxWidth: isMobile ? "99vw" : "60vw", margin: "0 auto"}}>
            <ImageList sx={{
                overflow: "hidden"
            }} variant="quilted" cols={isMobile ? 1 : 3} gap={8}>
                {props.images.map((image) => (
                    <ImageListItem key={image.src}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 0,
                                paddingBottom: '70%',
                                position: 'relative',
                                cursor: 'pointer',
                                overflow: "none"
                            }}
                            onClick={() => {
                                handleClickOpen(image.src)
                            }}
                        >
                            <LazyLoadImage
                                src={"/assets" + image.src.replace('.jpg', '_low.jpg') + `?${Math.random()}`}
                                height={"100%"}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <Overline>
                                <span>{t('t_image_fullsize')}</span>
                            </Overline>
                        </Box>
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
                            <img src={"/assets" + selectedImage} alt="Selected"/>
                        </>
                    )}
                </PreviewContainer>
            </Dialog>
        </Box>
    );
}

export default PhotoGallery
