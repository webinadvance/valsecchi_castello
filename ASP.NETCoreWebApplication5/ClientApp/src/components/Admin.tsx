import React, {useState, useEffect} from "react";
import {makeStyles} from "@mui/styles";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Admin() {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const classes = useStyles();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/db");
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

    const renderEditDialog = () => {
        console.log(selectedRow);
        return (
            <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Field 1"
                        value={selectedRow ? selectedRow.key : ""}
                        onChange={(event) =>
                            setSelectedRow({
                                ...selectedRow,
                                field1: event.target.value,
                            })
                        }
                        fullWidth
                    />
                    <div className={"py-4"}/>
                    <TextField
                        label="Field 2"
                        value={selectedRow ? selectedRow.value : ""}
                        onChange={(event) =>
                            setSelectedRow({
                                ...selectedRow,
                                field2: event.target.value,
                            })
                        }
                        fullWidth
                    />
                    {/* Add more fields as needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleEditDialogSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

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
                {renderEditDialog()}
            </>
        );
    } else {
        return <div>No data available</div>;
    }
}

export default Admin
