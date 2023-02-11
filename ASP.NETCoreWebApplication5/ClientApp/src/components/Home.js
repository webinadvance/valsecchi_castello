import React, {Fragment} from 'react';

export function Home() {
    return (<Fragment>
        <div id={"headerarea"} className={"relative"}>
            <video id={"videoblog"} autoPlay loop muted playsInline preload="metadata" id="videobg">
                <source
                    src="https://s3.amazonaws.com/uploads.serenohotels.com/app/uploads/2016/08/09220547/Villa-Pliniana-Descriptivo-v3_low.mp4"
                    type="video/mp4"/>
            </video>
        </div>
        <div className={"text-center"}>
            <div className={"text-4xl font-light text-gray-700"}>
                "THE MOST LUXURIOUS VILLA ON LAKE COMO"
            </div>
        </div>
    </Fragment>);
}
