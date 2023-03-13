import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
            defaultProps: {
                variant: "contained",
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    "& .MuiTableCell-head": {
                        fontWeight: "normal",
                    },
                },
            },
        },
    },
});