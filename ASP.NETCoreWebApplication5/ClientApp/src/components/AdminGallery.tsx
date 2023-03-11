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
    Button
} from "@mui/material";

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
    const [newImageUrl, setNewImageUrl] = useState("");

    const handleAddImage = () => {
        const newId = images.length + 1;
        const newImage = {
            id: newId,
            name: newImageName,
            url: newImageUrl,
        };
        setImages([...images, newImage]);
        setNewImageName("");
        setNewImageUrl("");
    };

    const handleDeleteImage = (id: any) => {
        const filteredImages = images.filter((image) => image.id !== id);
        setImages(filteredImages);
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
                                <Button variant="contained" color="error" onClick={() => handleDeleteImage(image.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <TextField label="Name" value={newImageName}
                                       onChange={(e) => setNewImageName(e.target.value)}/>
                        </TableCell>
                        <TableCell>
                            <TextField label="URL" value={newImageUrl}
                                       onChange={(e) => setNewImageUrl(e.target.value)}/>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={handleAddImage}>
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminGallery;
