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
} from "@mui/material";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Admin() {
    const [data, setData] = useState([]);
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

    if (data.length > 0) {
        return (
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
                            <TableRow key={index}>
                                {Object.values(row).map((value: any, index) => (
                                    <TableCell key={index}>{value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <div>No data available</div>;
    }
}

export default Admin;
