import React, {useEffect} from "react";
import 'react-quill/dist/quill.snow.css';
import withGoogleAuth from "./WithGoogleAuth";
import Api from "../Api";
import {AiTable} from "./AiEdit";

const Admin = React.memo(function () {
    const loadData = async () => {
        try {
            const response = await Api.langAll();
            const json = response;
            setData2(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    interface Lang {
        key: string;
        it: string;
        en: number;
    }

    const initialData: Lang[] = [];

    const [data2, setData2] = React.useState(initialData);

    const handleSave = (person: Lang) => {
        setData2((prevData) =>
            prevData.map((p) => (p.key === person.key ? person : p))
        );
    };

    return (
        <AiTable<Lang>
            data={data2}
            columns={[
                {key: 'key', label: 'key', colspan: 1},
                {key: 'en', label: 'en', colspan: 2},
                {key: 'it', label: 'it', colspan: 2},
            ]}
            onSave={handleSave}
        />
    );
})

export default withGoogleAuth(Admin)
