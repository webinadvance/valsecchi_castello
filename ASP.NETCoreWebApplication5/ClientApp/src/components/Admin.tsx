import React, {useEffect, useState} from "react";
import Api from "../Api";
import {AppBar, Drawer, IconButton, List, ListItem, ListItemText, Theme, Toolbar, Typography,} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import {AiTable} from "./AiEdit";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
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
    const [data, setData] = useState(initialData);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<"translations" | "routing">(() => {
        const savedValue = localStorage.getItem("selectedMenuItem");
        return (savedValue as "translations" | "routing") || "translations";
    });

    const classes = useStyles();
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleMenuItemClick = (menuItem: "translations" | "routing") => {
        setSelectedMenuItem(menuItem);
        localStorage.setItem("selectedMenuItem", menuItem);
        handleDrawerClose();
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await Api.langall();
                const json = response;
                setData(json);
            } catch (error) {
                console.error(error);
            }
        };
        (async () => {
            await loadData();
        })();
    }, []);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" noWrap>
                        My App
                    </Typography>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
                <List className={classes.list}>
                    <ListItem
                        button
                        selected={selectedMenuItem === "translations"}
                        onClick={() => handleMenuItemClick("translations")}
                    >
                        <ListItemText primary="Translations"/>
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedMenuItem === "routing"}
                        onClick={() => handleMenuItemClick("routing")}
                    >
                        <ListItemText primary="Routing"/>
                    </ListItem>
                </List>
            </Drawer>
            {selectedMenuItem === "translations" && (
                <AiTable<Lang>
                    data={data}
                    onNew={() => {
                        return {key: ""} as Lang;
                    }}
                    onDelete={async (row: any) => {
                        await Api.deleteadminlang(row as Lang);
                        const newData = data.filter((p) => p.key !== row.key);
                        setData(newData);
                    }}
                    columns={[
                        {key: "key", label: "key", colspan: 1, readonly: false},
                        {key: "en", label: "en", colspan: 2},
                        {key: "it", label: "it", colspan: 2},
                    ]}
                    onSave={async (obj: Lang) => {
                        const existingObj = data.find((p) => p.key === obj.key);
                        if (existingObj) {
                            const newData = data.map((p) => (p.key === obj.key ? obj : p));
                            setData(newData);
                        } else {
                            const newData = [...data, obj];
                            setData(newData);
                        }
                        await Api.saveadminlang(obj);
                    }}
                />
            )}
            {selectedMenuItem === "routing" && <div>ROUTING</div>}
        </>
    );
});

export default Admin;