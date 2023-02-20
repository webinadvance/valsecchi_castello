﻿import React, {useState} from "react";
import {Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {routes} from "../Globals";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav>
                <div className="flex justify-content-between w-100 lg:px-8">
                    <div className="lg:border-b flex items-center justify-content-between w-100">
                        <div className="flex-shrink-0 bg-white p-1 mb-2">
                            <img
                                className="w-36"
                                src="/logo.png"
                                alt="Workflow"
                            />
                        </div>
                        <div className="bg-black/[0] hidden lg:block align-self-end">
                            <div className="flex items-baseline">
                                {routes.map((x, i) => {
                                    return (<a key={i} href={x.key}
                                               className="hover:border-b-white border-b-2 border-transparent hover:text-white px-3 py-2 text-sm font-bold text-white">
                                        {x.title}
                                    </a>)
                                })}
                            </div>
                        </div>
                        <div className="flex lg:hidden">
                            <FontAwesomeIcon icon={faBars} className={"align-self-center"} color={"white"} size={"2x"}
                                             onClick={() => setIsOpen(!isOpen)}/>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="lg:hidden bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {routes.map((x, i) => {
                                return (<a key={i} href={x.key}
                                           className="hover:bg-gray-700 text-black block px-3 py-2 rounded-lg text-base font-medium">
                                    {x.title}
                                </a>)
                            })}
                        </div>
                    </div>
                </Transition>
            </nav>
        </div>
    );
}

export default Navbar;