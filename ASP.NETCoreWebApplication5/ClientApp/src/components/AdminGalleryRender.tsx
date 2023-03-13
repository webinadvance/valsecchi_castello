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
    Grid,
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
import React, {useState} from "react";
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

    const [selectedRow, setSelectedRow] = useState(null);

    function getDialog() {
        return <Dialog open={imageToDelete != null} onClose={() => {
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
        </Dialog>;
    }

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
            {getDialog()}
            <Paper>
                <Grid container spacing={2} sx={{display: "flex", flexDirection: "column"}}>
                    {images && images.map((rootTitle: any, index: any) => (
                        <Grid item key={index} xs={12}>
                            <Box sx={{textTransform: "uppercase"}}>
                                <Box sx={{my: 2, display: "flex", alignItems: "center", gap: 2}}>
                                    <TextField fullWidth value={rootTitle.title}/>
                                    <TextField
                                        fullWidth
                                        placeholder={"new value"}
                                        onChange={(e) => {
                                            newTitle[rootTitle.title] = e.target.value;
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={async () => await handleSaveTitle(rootTitle)}
                                    >
                                        save
                                    </Button>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    setSelectedRow(selectedRow === rootTitle.title ? null : rootTitle.title)
                                }
                            >
                                Manage images
                            </Button>
                            {selectedRow === rootTitle.title && (
                                <Box>
                                    <Box sx={{py: 2}}>
                                        <input type="file" onChange={handleFileChange}/>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={async () => await handleFileUpload(rootTitle.title)}
                                        >
                                            Upload
                                        </Button>
                                    </Box>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{mt: 2}}
                                        component="ul"
                                        alignItems="flex-start"
                                        justifyContent="flex-start"
                                        direction="row"
                                        wrap="wrap"
                                        columnSpacing={{xs: 2, sm: 3, md: 4}}
                                        rowSpacing={{xs: 2, sm: 3, md: 4}}
                                    >
                                        {rootTitle.data.map((image: any, index2: any) => (
                                            <Grid item key={`${index}-${index2}`} component="li" xs={6} sm={4}
                                                  md={3}>
                                                <Box sx={{position: "relative", mb: 2}}>
                                                    <Avatar
                                                        sx={{width: "100%", height: "100%"}}
                                                        variant="rounded"
                                                        src={`./assets${image.src}`}
                                                        alt={image.title}
                                                    />
                                                    <Box sx={{position: "absolute", top: 10, right: 10}}>
                                                        <Fab
                                                            color={"primary"}
                                                            size="small"
                                                            onClick={() => setImageToDelete(image.src)}
                                                        >
                                                            <DeleteIcon/>
                                                        </Fab>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </>
    );
}