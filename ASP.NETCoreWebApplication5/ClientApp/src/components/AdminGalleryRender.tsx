import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import {
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    lighten,
    Paper,
    TextField,
    Theme,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, {useEffect, useState} from "react";

export function AdminGalleryRender(
    loading: boolean,
    imageToDelete: any,
    setImageToDelete: (value: ((prevState: null) => null) | null) => void,
    handleDeleteImage: () => Promise<void>,
    isMobile: boolean,
    images: any,
    newTitle: Record<string, any>,
    handleSaveTitle: (rootTitle: any) => Promise<void>,
    handleFileChange: (e: any) => void,
    handleFileUpload: (parentTitle: any) => Promise<void>,
    handleAddDir: (newDir: any) => Promise<void>,
    handleDeleteDir: (dirToDelete: any) => Promise<void>
) {
    const [selectedRow, setSelectedRow] = useState<any>(
        localStorage.getItem("selectedRow") ?? null // Load the initial value from Local Storage
    );
    const [open, setOpen] = useState(false);
    const [dialogDeleteDir, setDialogDeleteDir] = useState<any>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    let newDir: any = null;
    const [imageCount, setImageCount] = useState<any>({});

    function getDialog() {
        return <Dialog
            fullWidth={true}
            fullScreen={fullScreen}
            open={imageToDelete != null}
            onClose={() => setImageToDelete(null)}
        >
            <DialogTitle>Delete Image?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this image?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setImageToDelete(null)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={async () => await handleDeleteImage()}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>;
    }

    function getDialogDeleteDir() {
        return <Dialog
            fullWidth={true}
            fullScreen={fullScreen}
            open={dialogDeleteDir != null}
            onClose={() => setImageToDelete(null)}
        >
            <DialogTitle>Delete Section?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the section{" "}
                    <Box component="span" sx={{fontWeight: "bold"}}>
                        {dialogDeleteDir}
                    </Box>{" "}
                    and all images it contains? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setDialogDeleteDir(null)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={async () => await handleDeleteDir(dialogDeleteDir)}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>;
    }

    useEffect(() => {
        localStorage.setItem("selectedRow", selectedRow); // Store the updated value to Local Storage
    }, [selectedRow]);

    useEffect(() => {
        const counts: any = {};
        images?.forEach((rootTitle: any) => {
            counts[rootTitle.title] = rootTitle.data.length;
        });
        setImageCount(counts);
    }, [images]);

    return <>
        {loading && <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999
            }}
        >
            <Backdrop open>
                <CircularProgress color="primary"/>
            </Backdrop>
        </Box>}
        {getDialog()}
        {getDialogDeleteDir()}
        <Paper>
            <Grid
                container
                spacing={0}
                sx={{display: "flex", flexDirection: "column"}}
            >
                {images &&
                    images.map((rootTitle: any, index: any) => <Grid
                        item
                        key={index}
                        sx={{
                            mb: 2
                        }}
                    >
                        <Paper elevation={4} sx={{mb: 2, p: 2}}>
                            <Box
                                sx={{
                                    my: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2
                                }}
                            >
                                <TextField fullWidth value={rootTitle.title}/>
                                <TextField
                                    fullWidth
                                    placeholder={"new value"}
                                    onChange={e => {
                                        newTitle[rootTitle.title] = e.target.value;
                                    }}
                                />
                                <IconButton
                                    size={"small"}
                                    color="primary"
                                    onClick={async () => await handleSaveTitle(rootTitle)}
                                >
                                    <SaveIcon/>
                                </IconButton>
                                <IconButton
                                    size={"small"}
                                    color="error"
                                    onClick={() => setDialogDeleteDir(rootTitle.title)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Paper>
                        <Box sx={{px: 2}}>
                            <Button
                                variant="text"
                                size="small"
                                color="primary"
                                onClick={() =>
                                    setSelectedRow(
                                        selectedRow === rootTitle.title ? null : rootTitle.title
                                    )
                                }
                                endIcon={<ExpandMoreIcon/>}
                            >
                                {`Manage images (${imageCount[rootTitle.title] ?? 0})`}
                            </Button>
                        </Box>
                        {selectedRow === rootTitle.title && <Box>
                            <Paper
                                elevation={0}
                                sx={{
                                    my: 2,
                                    p: 2,
                                    backgroundColor: (theme: Theme) =>
                                        lighten(theme.palette.background.paper, 0.1)
                                }}
                            >
                                <input type="file" onChange={handleFileChange}/>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () =>
                                        await handleFileUpload(rootTitle.title)
                                    }
                                >
                                    Upload
                                </Button>
                            </Paper>
                            <Grid
                                container
                                spacing={2}
                                sx={{mt: 2, p: 2}}
                                component="ul"
                                justifyContent="center" // add this property
                                alignItems="center" // add this property
                                direction="row"
                                wrap="wrap"
                                columnSpacing={{xs: 2, sm: 3, md: 4}}
                                rowSpacing={{xs: 2, sm: 3, md: 4}}
                            >
                                {rootTitle.data.map((image: any, index2: any) => <Grid
                                    item
                                    key={`${index}-${index2}`}
                                    component="li"
                                    sx={{width: 200, height: 200}}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                paddingTop: "100%",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundImage: `url('/assets${image.src}')`,
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%"
                                                }}
                                            >
                                                <Button
                                                    size={"small"}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setImageToDelete(image.src)}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>)}
                            </Grid>
                        </Box>}
                    </Grid>)}
            </Grid>
            <Paper
                elevation={4}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Button
                    size={"large"}
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    Add new section
                </Button>
            </Paper>
            <Dialog
                open={open}
                onClose={() => setOpen(true)}
                fullWidth={true}
                fullScreen={fullScreen}
            >
                <DialogTitle>Add new section</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={e => {
                            newDir = e.target.value;
                        }}
                        label="Enter section name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={async () => await handleAddDir(newDir)}
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    </>;
}
