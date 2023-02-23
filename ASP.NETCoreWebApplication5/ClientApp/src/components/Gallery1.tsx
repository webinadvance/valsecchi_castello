import Gallery from "./Gallery";

export const Gallery1 = () => {
    return (
        <>
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
        </>
    );
}