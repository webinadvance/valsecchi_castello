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
            "title": "selezione",
            "data":
                [
                    {
                        title: "Image 2",
                        src: "https://example.com/image2.jpg",
                    },
                    {
                        title: "Image 3",
                        src: "https://example.com/image3.jpg",
                    }
                ]
        },
        {
            "title": "selezione2",
            "data":
                [
                    {
                        title: "Image 22",
                        src: "https://example.com/image22.jpg",
                    },
                    {
                        title: "Image 32",
                        src: "https://example.com/image32.jpg",
                    }
                ]
        }
    ]);

    const [newImageName, setNewImageName] = useState("");
    const [selectedFile, setSelectedFile] = useState<any>(null);

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
                    {images.map((selezione, index) => (
                        <React.Fragment key={index}>
                            <TableRow>
                                <TableCell colSpan={4}>{selezione.title}</TableCell>
                            </TableRow>
                            {selezione.data.map((image, index2) => (
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
                        </React.Fragment>
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