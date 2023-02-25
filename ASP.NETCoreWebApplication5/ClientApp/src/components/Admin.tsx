import React, {useState, useEffect} from "react";

interface Props {
    onUpdateJson: (newJsonString: string) => void;
}

const Admin = () => {
    const [json, setJson] = useState<any>();
    const [error, setError] = useState("");

    const jsonFilePath = "/locales/en.json";

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        try {
            const newJson = JSON.parse(value);
            setJson(newJson);
            setError("");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleRegenerateClick = () => {
        /*     onUpdateJson(JSON.stringify(json));*/
    };

    // Load the initial JSON file from the provided file path
    useEffect(() => {
        fetch(jsonFilePath)
            .then((response) => response.json())
            .then((data) => {
                setJson(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [jsonFilePath]);

    // Render the component once the initial JSON file is loaded
    return json ? (
        <div>
            <h2>Edit JSON</h2>
            <textarea value={JSON.stringify(json, null, 2)} onChange={handleInputChange}/>
            {error && <div>{error}</div>}
            <button onClick={handleRegenerateClick}>Regenerate</button>
        </div>
    ) : (
        <div>Loading JSON file...</div>
    );
};

export default Admin;
