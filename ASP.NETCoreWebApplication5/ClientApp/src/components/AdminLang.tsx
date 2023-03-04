import React, {useEffect} from "react";
import 'react-quill/dist/quill.snow.css';
import Api from "../Api";
import {AiTable} from "./AiEdit";
import {AppBar, Button, Theme, Toolbar, Typography} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
        },
    })
);

interface Lang {
    key: string;
    it: string;
    en: number;
}

const initialData: Lang[] = [];

const AdminLang = React.memo(function () {
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

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" noWrap>
                        My App
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <AiTable<Lang>
                data={data2}
                onNew={() => {
                    return {key: ""} as Lang;
                }}
                onDelete={async (row) => {
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

export default AdminLang;
