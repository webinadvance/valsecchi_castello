import React, {useEffect} from "react";
import 'react-quill/dist/quill.snow.css';
import withGoogleAuth from "./WithGoogleAuth";
import Api from "../Api";
import {AiTable} from "./AiEdit";

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

    interface Lang {
        key: string;
        it: string;
        en: number;
    }

    const initialData: Lang[] = [];

    const [data2, setData2] = React.useState(initialData);

    return (
        <AiTable<Lang>
            data={data2}
            onNew={() => {
                return {key: ""} as Lang
            }}
            onDelete={async (row) => {
                await Api.deleteadmin(row as Lang);
                await loadData();
            }}
            columns={[
                {key: 'key', label: 'key', colspan: 1, readonly: false},
                {key: 'en', label: 'en', colspan: 2},
                {key: 'it', label: 'it', colspan: 2},
            ]}
            onSave={async (obj: Lang) => {
                setData2((prevData) =>
                    prevData.map((p) => (p.key === obj.key ? obj : p))
                );
                await Api.saveadmin(obj);
                await loadData();
            }}
        />
    );
})

export default withGoogleAuth(Admin)
