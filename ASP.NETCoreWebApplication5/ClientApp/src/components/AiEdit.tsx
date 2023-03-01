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
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {Edit} from '@mui/icons-material';

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onSave: (data: T) => void;
}

interface Column<T> {

    readonly?: boolean,

    colspan: number;
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

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table style={{tableLayout: "fixed"}}>
                    <TableHead>
                        <TableRow>
                            {columns.map((col: any) => (
                                <TableCell colSpan={col.colspan} key={col.key}>{col.label}</TableCell>
                            ))}
                            <TableCell colSpan={1} sx={{textAlign: "right"}}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any) => (
                            <TableRow key={JSON.stringify(row)}>
                                {columns.map((col: any) => (
                                    <TableCell colSpan={col.colspan} sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }} key={col.key}>
                                        {row[col.key]}
                                    </TableCell>
                                ))}
                                <TableCell colSpan={1} sx={{textAlign: "right"}}>
                                    <IconButton onClick={() => handleEditClick(row)}>
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog fullWidth={true} maxWidth={"md"} fullScreen={fullScreen} open={editDialogOpen}
                    onClose={handleCancelClick}>
                <DialogTitle>Edit Row</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please edit the fields below:
                    </DialogContentText>
                    {editedData &&
                        columns.map((col) => (
                            <div key={col.key as string}>
                                <TextField
                                    InputProps={{
                                        readOnly: col.readonly,
                                    }}
                                    multiline={true}
                                    label={col.label}
                                    value={editedData[col.key] as any}
                                    onChange={(e) =>
                                        handleFieldChange(col.key, e.target.value)
                                    }
                                    fullWidth
                                    margin="normal">
                                </TextField>
                            </div>
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
    )
}
