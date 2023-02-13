import React, {Fragment, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const elements = ["VILLA", "ACCOMMODATION", "FACILITIES", "WEDDINGS & EVENTSHISTOR", "YGALLERY", "PRESS", "CONTACTS"];

    return (
        <Fragment>
            <nav className="flex items-center justify-between p-4 text-white">
                <div className="flex items-center">
                    <a href="#" className="font-bold text-xl">
                        My App
                    </a>
                </div>
                <div className="flex items-center sm:hidden">
                    <FontAwesomeIcon icon={faBars} size={"2x"}/>
                </div>
                <div className="hidden sm:flex sm:items-center sm:w-auto">
                    {elements.map((x, i) => {
                        return (
                            <a href="#" className="px-4 text-white text-sm font-light">
                                {x}
                            </a>
                        )
                    })}
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;