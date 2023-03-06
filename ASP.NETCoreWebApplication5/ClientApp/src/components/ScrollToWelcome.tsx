import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

const ScrollToWelcome: React.FC = () => {
    const scrollFunction = () => {
        const welcome = document.getElementById("welcome");
        if (welcome) {
            window.scrollTo({
                behavior: "smooth",
                top: welcome.offsetTop,
            });
        }
    };

    return (
        <div onClick={scrollFunction}>
            <FontAwesomeIcon
                icon={faArrowDown}
                className="cursor-pointer opacity-75 absolute bottom-0 mb-4 -translate-x-1/2 left-1/2 z-10"
                color="white"
                size="2x"
            />
        </div>
    );
};

export default ScrollToWelcome;
