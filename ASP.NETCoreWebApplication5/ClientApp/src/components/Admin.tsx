import React, {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputLabel, useTheme, DialogProps
} from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Admin = React.memo(function () {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const classes = useStyles();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/db/all");
            const json = await response.json();
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

        const useStyles = makeStyles({
            customDialog: {
                paddingTop: "1rem",
                maxWidth: 'none', // set maxWidth to 'none' to allow custom width
                '& .MuiDialog-paper': {
                    width: '50vw', // set width to 50% of viewport width
                },
            },
        });
        const classes = useStyles();
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
        const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');

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
                        value={value ? value.eng : ""}
                        onChange={(content: any, delta, source, editor) => {
                            const text = editor.getText(content);
                            const modifiedText = text.replace(/\n/g, '<br/>').replace(/^(<br\/>)+|(<br\/>)+$/g, '').trim();
                            console.log(modifiedText);
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
                            console.log(modifiedText);
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
            <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="data table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(data[0]).map((key) => (
                                    <TableCell key={key}>{key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() => handleRowClick(row)}
                                    style={{cursor: "pointer"}}
                                >
                                    {Object.values(row).map((value: any, index) => (
                                        <TableCell key={index}>{value}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <RenderEditDialog/>
            </>
        );
    } else {
        return <div>No data available</div>;
    }
})

export default Admin
