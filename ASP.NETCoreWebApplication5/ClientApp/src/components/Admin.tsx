import React, {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    useTheme
} from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import withGoogleAuth from "./WithGoogleAuth";
import Api from "../Api";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Admin = React.memo(function () {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const fetchData = async () => {
        try {
            const response = await Api.langAll();
            const json = response;
            setData(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRowClick = (rowData: any) => {
        setSelectedRow(rowData);
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
    };

    const handleEditDialogSave = () => {
        setOpenEditDialog(false);
    };

    const RenderEditDialog = React.memo(function () {
        const [value, setValue] = useState(selectedRow);

        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

        return (
            <Dialog fullWidth={true} maxWidth={"md"} fullScreen={fullScreen}
                    open={openEditDialog}
                    onClose={handleEditDialogClose}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent style={{paddingTop: "6px"}}>
                    <TextField
                        label={"key"}
                        value={value ? value.key : ""}
                        onChange={(event) =>
                            setValue({
                                ...value,
                                key: event.target.value,
                            })
                        }
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                    <div className={"my-4"}/>
                    <InputLabel>Italiano</InputLabel>
                    <ReactQuill
                        modules={{toolbar: false}}
                        formats={['plain']}
                        style={{height: '100px'}}
                        value={value ? value.en : ""}
                        onChange={(content: any, delta, source, editor) => {
                            const text = editor.getText(content);
                            const modifiedText = text.replace(/\n/g, '<br/>').replace(/^(<br\/>)+|(<br\/>)+$/g, '').trim();
                        }}
                    />
                    <div className={"my-4"}/>
                    <InputLabel>English</InputLabel>
                    <ReactQuill
                        modules={{toolbar: false}}
                        formats={['plain']}
                        style={{height: '100px'}}
                        value={value ? value.it : ""}
                        onChange={(content: any, delta, source, editor) => {
                            const text = editor.getText(content);
                            const modifiedText = text.replace(/\n/g, '<br/>').replace(/^(<br\/>)+|(<br\/>)+$/g, '').trim();
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleEditDialogSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    });

    if (data.length > 0) {
        return (
            <div id={"admin"}>
                <TableContainer component={Paper}>
                    <Table aria-label="data table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(data[0]).map((key) => (
                                    <TableCell key={key}>
                                        {key}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow key={row.key} onClick={() => handleRowClick(row)}>
                                    {Object.values(row).map((value: any) => (
                                        // Replace className prop
                                        <TableCell key={value}>
                                            {value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <RenderEditDialog/>
            </div>
        );
    } else {
        return <div>No data available</div>;
    }
})

export default withGoogleAuth(Admin)
