import Gallery from "./Gallery";

export const Gallery1 = () => {
    return (
        <>
            <h2 className={""}>
                the villa
            </h2>
            <Gallery
                images={[
                    {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                    {src: "https://picsum.photos/1024/500?random=" + Math.random() + ""},
                    {src: "https://picsum.photos/2024/860?random=" + Math.random() + ""},
                    {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                    {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                    {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                    {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                ]}/>
            <h2 className={""}>
                the rooms
            </h2>

            <div className={"mb-6"}>
                <Gallery
                    images={[
                        {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                        {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                        {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                        {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                        {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                        {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                        {src: "https://picsum.photos/1024/860?random=" + Math.random() + ""},
                    ]}/>
            </div>
        </>
    );
}