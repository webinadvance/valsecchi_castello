import {
    Avatar,
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

export function AdminGalleryRender(loading: boolean,
                                   imageToDelete: any,
                                   setImageToDelete: (value: (((prevState: null) => null) | null)) => void,
                                   handleDeleteImage: () => Promise<void>,
                                   isMobile: boolean,
                                   images: any,
                                   newTitle: Record<string, any>,
                                   handleSaveTitle: (rootTitle: any) => Promise<void>,
                                   handleFileChange: (e: any) => void,
                                   handleFileUpload: (parentTitle: any) => Promise<void>) {
    return (
        <>
            {loading && (
                <Box sx={{
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
                </Box>
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
                        await handleDeleteImage();
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
                                                onClick={async () => await handleSaveTitle(rootTitle)}
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
                                                onClick={async () => await handleFileUpload(rootTitle.title)}>
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
                                                     onClick={() => setImageToDelete(image.src)}
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
}