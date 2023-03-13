import React, {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useMediaQuery, useTheme} from "@mui/material";
import {Api2} from "../Api2";
import {AdminGalleryRender} from "./AdminGalleryRender";

const AdminGallery = () => {
    const [images, setImages] = useState<any>();
    const [selectedFile, setSelectedFile] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [newTitle] = useState<Record<string, any>>({});

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAddDir = useCallback(async (newDir: any) => {
        setLoading(true);
        await axios.post("api/db/adddir", null, {
            params: {
                dirName: newDir,
            },
            withCredentials: true,
        });
        setLoading(false);
    }, []);

    const handleFileUpload = useCallback(async (parentTitle: any) => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        setLoading(true);
        await axios.post("api/db/uploadimage", formData, {
            params: {parentTitle},
            withCredentials: true,
        });
        window.location.reload();
        setLoading(false);
    }, [selectedFile]);

    const hanfleDeleteImage = useCallback(async () => {
        setLoading(true);
        await Api2.deleteImage(imageToDelete ?? "");
        setLoading(false);
        window.location.reload();
    }, [imageToDelete]);

    const handleSaveTitle = useCallback(async (rootTitle: any) => {
        if (newTitle[rootTitle.title]) {
            setLoading(true);
            await axios.post("api/db/changedirname", null, {
                params: {
                    oldValue: rootTitle.title,
                    newValue: newTitle[rootTitle.title],
                },
                withCredentials: true,
            });
            setLoading(false);
            window.location.reload();
        }
    }, [newTitle]);

    return AdminGalleryRender(
        loading,
        imageToDelete,
        setImageToDelete,
        hanfleDeleteImage,
        isMobile,
        images,
        newTitle,
        handleSaveTitle,
        handleFileChange,
        handleFileUpload,
        handleAddDir
    );
};

export default AdminGallery;
