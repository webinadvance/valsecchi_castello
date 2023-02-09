import React, {Fragment} from 'react';

export function Home() {
    return (
        <Fragment>
            <div id={"headerarea"} className={"relative"}>
            </div>
            <video autoPlay loop muted playsInline preload="metadata" id="videobg">
                <source
                    src="https://s3.amazonaws.com/uploads.serenohotels.com/app/uploads/2016/08/09220547/Villa-Pliniana-Descriptivo-v3_low.mp4"
                    type="video/mp4"/>
            </video>
        </Fragment>
    );
}
