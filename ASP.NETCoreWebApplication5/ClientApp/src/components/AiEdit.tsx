import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import {Edit} from '@mui/icons-material';

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onSave: (data: T) => void;
}

interface Column<T> {
    key: keyof T;
    label: string;
}

export function AiTable<T extends object>({
                                              data,
                                              columns,
                                              onSave,
                                          }: DataTableProps<T>) {
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [editedData, setEditedData] = React.useState<T | null>(null);

    const handleEditClick = (row: T) => {
        setEditedData(row);
        setEditDialogOpen(true);
    };

    const handleSaveClick = () => {
        if (editedData) {
            onSave(editedData);
            setEditDialogOpen(false);
            setEditedData(null);
        }
    };

    const handleCancelClick = () => {
        setEditDialogOpen(false);
        setEditedData(null);
    };

    const handleFieldChange = (key: keyof T, value: any) => {
        if (editedData) {
            setEditedData((prevData: any) => ({
                ...prevData,
                [key]: value,
            }));
        }
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col: any) => (
                                <TableCell key={col.key}>{col.label}</TableCell>
                            ))}
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any) => (
                            <TableRow key={JSON.stringify(row)}>
                                {columns.map((col: any) => (
                                    <TableCell key={col.key}>
                                        {row[col.key]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(row)}>
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={editDialogOpen} onClose={handleCancelClick}>
                <DialogTitle>Edit Row</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please edit the fields below:
                    </DialogContentText>
                    {editedData &&
                        columns.map((col) => (
                            <TextField
                                key={col.key as string}
                                label={col.label}
                                value={editedData[col.key] as any}
                                onChange={(e) =>
                                    handleFieldChange(col.key, e.target.value)
                                }
                                fullWidth
                                margin="normal"
                            />
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveClick} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
