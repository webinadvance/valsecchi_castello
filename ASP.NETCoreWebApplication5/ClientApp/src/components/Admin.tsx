import React, {useEffect} from "react";
import Api from "../Api";
import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import {AiTable} from "./AiEdit";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        toolbarSmall: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        list: {
            width: 250,
            backgroundColor: theme.palette.background.paper,
        },
    })
);

interface Lang {
    key: string;
    it: string;
    en: number;
}

const initialData: Lang[] = [];

const Admin = React.memo(function () {
    const loadData = async () => {
        try {
            const response = await Api.langall();
            const json = response;
            setData2(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, []);

    const [data2, setData2] = React.useState(initialData);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const classes = useStyles();
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    );

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar
                    className={clsx(classes.toolbar, {
                        [classes.toolbarSmall]: isSmallScreen,
                    })}
                >
                    <Typography variant="h6" noWrap>
                        Admin
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    {isSmallScreen ? null : (
                        <>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">Login1</Button>
                            <Button color="inherit">Login2</Button>
                            <Button color="inherit">Login3</Button>
                            <Button color="inherit">Login4</Button>
                            <Button color="inherit">Login5</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
            >
                <List className={classes.list}>
                    <ListItem onClick={handleDrawerClose}>
                        <ListItemText primary="Login"/>
                    </ListItem>
                    <ListItem onClick={handleDrawerClose}>
                        <ListItemText primary="Login1"/>
                    </ListItem>
                    <ListItem onClick={handleDrawerClose}>
                        <ListItemText primary="Login2"/>
                    </ListItem>
                    <ListItem onClick={handleDrawerClose}>
                        <ListItemText primary="Login3"/>
                    </ListItem>
                    <ListItem onClick={handleDrawerClose}>
                        <ListItemText primary="Login4"/>
                    </ListItem>
                    <ListItem onClick={handleDrawerClose}>
                        <ListItemText primary="Login5"/>
                    </ListItem>
                </List>
            </Drawer>
            <AiTable
                <Lang>
                data={data2}
                onNew={() => {
                    return {key: ""} as Lang;
                }}
                onDelete={async (row: any) => {
                    await Api.deleteadminlang(row as Lang);
                    await loadData();
                }}
                columns={[
                    {key: "key", label: "key", colspan: 1, readonly: false},
                    {key: "en", label: "en", colspan: 2},
                    {key: "it", label: "it", colspan: 2},
                ]}
                onSave={async (obj: Lang) => {
                    setData2((prevData) =>
                        prevData.map((p) => (p.key === obj.key ? obj : p))
                    );
                    await Api.saveadminlang(obj);
                    await loadData();
                }}
            />
        </>
    );
});

export default Admin;