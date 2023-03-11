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
    Button,
} from "@mui/material";
import Api from "../Api";

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
            //await Api.uploadimage(formData);
            await axios.post("/api/db/uploadimage", formData, {params: {parentTitle}, withCredentials: true});
            // Add the uploaded image to the corresponding data array
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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {images && images.map((selezione: any, index: any) => (
                        <React.Fragment key={index}>
                            <TableRow>
                                <TableCell colSpan={4}>{selezione.title}</TableCell>
                            </TableRow>
                            {selezione.data.map((image: any, index2: any) => (
                                <TableRow key={`${index}-${index2}`}>
                                    <TableCell>{index2 + 1}</TableCell>
                                    <TableCell>{image.title}</TableCell>
                                    <TableCell>{image.src}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            /*      onClick={() => handleDeleteImage(image.src)}*/
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                    <TextField
                                        label="Name"
                                        value={newImageName}
                                        onChange={(e) => setNewImageName(e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input type="file" onChange={handleFileChange}/>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary"
                                            onClick={() => handleFileUpload(selezione.title)}>
                                        Upload
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminGallery;
