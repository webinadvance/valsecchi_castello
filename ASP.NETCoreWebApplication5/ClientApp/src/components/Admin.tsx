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
    const loadData = async () => {
        try {
            const response = await Api.langall();
            const json = response;
            setData(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, []);

    const [data, setData] = useState(initialData);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showTranslations, setShowTranslations] = useState(false);

    const classes = useStyles();
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleTranslationsClick = () => {
        setShowTranslations(true);
        handleDrawerClose();
    };

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" noWrap>
                        My App
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
            >
                <List className={classes.list}>
                    <ListItem onClick={handleTranslationsClick}>
                        <ListItemText primary="Translations"/>
                    </ListItem>
                    <ListItem onClick={handleDrawerClose}>
                        <ListItemText primary="Routing"/>
                    </ListItem>
                </List>
            </Drawer>
            {showTranslations && (
                <AiTable<Lang>
                    data={data}
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
                        setData((prevData) =>
                            prevData.map((p) => (p.key === obj.key ? obj : p))
                        );
                        await Api.saveadminlang(obj);
                        await loadData();
                    }}
                />
            )}
        </>
    );
});

export default Admin;