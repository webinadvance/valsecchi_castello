import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    useMediaQuery, useTheme, Avatar, Theme,
} from "@mui/material";
import Api from "../Api";
import {Api2} from "../Api2";
import {Fab} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

const AdminGallery = () => {
    const [images, setImages] = useState<any>();

    const [newImageName, setNewImageName] = useState("");
    const [selectedFile, setSelectedFile] = useState<any>();

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (parentTitle: any) => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        try {
            await axios.post("/api/db/uploadimage", formData, {params: {parentTitle}, withCredentials: true});
            setImages((prevImages: any) => {
                return prevImages.map((selezione: any) => {
                    if (selezione.title === parentTitle) {
                        return {
                            ...selezione,
                            data: [
                                ...selezione.data,
                                {
                                    title: newImageName,
                                    src: "https://example.com/newimage.jpg",
                                }
                            ]
                        };
                    } else {
                        return selezione;
                    }
                });
            });

            // Clear the input fields
            setNewImageName("");
            setSelectedFile(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("./data/gallery.json");
                setImages(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const [imageToDelete, setImageToDelete] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Dialog open={imageToDelete != null} onClose={() => {
                setImageToDelete(null);
            }}>
                <DialogTitle>Delete Image?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this image?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setImageToDelete(null);
                    }}>Cancel</Button>
                    <Button onClick={async () => {
                        await Api2.deleteImage(imageToDelete ?? "");
                        setImageToDelete(null);
                    }}>Delete</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {!isMobile && <TableCell>ID</TableCell>}
                            {!isMobile && <TableCell>Name</TableCell>}
                            <TableCell>Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {images && images.map((selezione: any, index: any) => (
                            <React.Fragment key={index}>
                                <TableRow
                                    style={{textTransform: "uppercase"}}>
                                    <TableCell sx={{
                                        borderTopWidth: (theme) => theme.spacing(1),
                                        borderTopStyle: "solid",
                                        borderTopColor: (theme) => theme.palette.secondary.main,
                                    }} style={{fontWeight: "bold"}}
                                               colSpan={isMobile ? 3 : 4}>
                                        {selezione.title}
                                    </TableCell>
                                </TableRow>
                                {selezione.data.map((image: any, index2: any) => (
                                    <TableRow key={`${index}-${index2}`}>
                                        {!isMobile && <TableCell>{index2 + 1}</TableCell>}
                                        {!isMobile && <TableCell>{image.title}</TableCell>}
                                        <TableCell>
                                            <Avatar sx={{width: isMobile ? 200 : 100, height: isMobile ? 200 : 100}}>
                                                <img src={"./assets" + image.src} alt={image.title}/>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                                <Fab color={"primary"}
                                                     onClick={() => {
                                                         setImageToDelete(image.src);
                                                     }}
                                                >
                                                    <DeleteIcon/>
                                                </Fab>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    {!isMobile && <TableCell></TableCell>}
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                        <input type="file" onChange={handleFileChange}/>
                                        <Button variant="contained" color="primary"
                                                onClick={() => handleFileUpload(selezione.title)}>
                                            Upload
                                        </Button>
                                    </TableCell>
                                    {!isMobile && <TableCell></TableCell>}
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AdminGallery;
