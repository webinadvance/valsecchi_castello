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
    useMediaQuery, useTheme, Avatar, Theme, Backdrop,
} from "@mui/material";
import Api from "../Api";
import {Api2} from "../Api2";
import {Fab} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const AdminGallery = () => {
    const [images, setImages] = useState<any>();

    const [newImageName, setNewImageName] = useState("");
    const [selectedFile, setSelectedFile] = useState<any>();

    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (parentTitle: any) => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        setLoading(true);
        await axios.post("/api/db/uploadimage", formData, {
            params: {parentTitle},
            withCredentials: true,
        });
        window.location.reload();
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`./data/gallery.json?${Date.now()}`);
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

    let newTitle: Record<string, any> = {};

    return (
        <>
            {loading && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9999
                }}>
                    <Backdrop open>
                        <CircularProgress color="primary"/>
                    </Backdrop>
                </div>
            )}
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
                        setLoading(true);
                        await Api2.deleteImage(imageToDelete ?? "");
                        setLoading(false);
                        window.location.reload();
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
                        {images && images.map((rootTitle: any, index: any) => (
                            <React.Fragment key={index}>
                                <TableRow style={{textTransform: "uppercase"}}>
                                    <TableCell sx={{
                                        borderTopWidth: (theme) => theme.spacing(1),
                                        borderTopStyle: "solid",
                                        borderTopColor: (theme) => theme.palette.secondary.main,
                                        fontWeight: "bold",
                                    }} colSpan={isMobile ? 3 : 4}>
                                        <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                                            <TextField fullWidth value={rootTitle.title}/>
                                            <TextField fullWidth placeholder={"new value"} onChange={(e) => {
                                                newTitle[rootTitle.title] = e.target.value;
                                            }}/>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={async () => {
                                                    if (newTitle[rootTitle.title]) {
                                                        setLoading(true);
                                                        await axios.post("/api/db/changedirname", null, {
                                                            params: {
                                                                oldValue: rootTitle.title,
                                                                newValue: newTitle[rootTitle.title]
                                                            },
                                                            withCredentials: true,
                                                        });
                                                        setLoading(false);
                                                        window.location.reload();
                                                    }
                                                }}
                                            >
                                                save
                                            </Button>

                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={isMobile ? 2 : 4}>
                                        <input type="file" onChange={handleFileChange}/>
                                        <Button variant="contained" color="primary"
                                                onClick={async () => {
                                                    return await handleFileUpload(rootTitle.title);
                                                }}>
                                            Upload
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {rootTitle.data.map((image: any, index2: any) => (
                                    <TableRow key={`${index}-${index2}`}>
                                        {!isMobile && <TableCell>{index2 + 1}</TableCell>}
                                        {!isMobile && <TableCell>{image.title}</TableCell>}
                                        <TableCell>
                                            <Avatar
                                                sx={{width: isMobile ? "30vw" : 100, height: isMobile ? "30vw" : 100}}>
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
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AdminGallery;
