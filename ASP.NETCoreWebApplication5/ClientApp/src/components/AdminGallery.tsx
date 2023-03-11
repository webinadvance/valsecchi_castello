import React, {useState} from "react";
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
    const [images, setImages] = useState([
        {
            id: 1,
            name: "Image 1",
            url: "https://example.com/image1.jpg",
        },
        {
            id: 2,
            name: "Image 2",
            url: "https://example.com/image2.jpg",
        },
        {
            id: 3,
            name: "Image 3",
            url: "https://example.com/image3.jpg",
        },
    ]);
    const [newImageName, setNewImageName] = useState("");
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleAddImage = () => {
        const newId = images.length + 1;
        const newImage = {
            id: newId,
            name: newImageName,
            url: selectedFile ? URL.createObjectURL(selectedFile) : "",
        };
        setImages([...images, newImage]);
        setNewImageName("");
        setSelectedFile(null);
    };

    const handleDeleteImage = (id: any) => {
        const filteredImages = images.filter((image) => image.id !== id);
        setImages(filteredImages);
    };

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        try {
            await Api.uploadimage(formData);
        } catch (error) {
            console.error(error);
        }
    };

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
                    {images.map((image) => (
                        <TableRow key={image.id}>
                            <TableCell>{image.id}</TableCell>
                            <TableCell>{image.name}</TableCell>
                            <TableCell>{image.url}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteImage(image.id)}
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
                            <Button variant="contained" color="primary" onClick={handleAddImage}>
                                Add
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleFileUpload}>
                                Upload
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminGallery;