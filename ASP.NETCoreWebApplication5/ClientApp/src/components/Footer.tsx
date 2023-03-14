import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import LanguageSwitcher from "./LanguageSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {type RootState} from "../Store";
import {increment} from "../dataSlice";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.data);
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div className="text-center bg-gray-900 text-gray-300 pt-10">
            <div className="mx-auto">
                <div className="flex flex-wrap">
                    {/* Contacts */}
                    <div className="px-4 w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-4">Contacts</h3>
                        <p className="mb-2">Via Rodari 2</p>
                        <p className="mb-2">22100 Como</p>
                        <p className="mb-2">+39 333 811 8964</p>
                        <p>odescalchi@lakecomodmc.it</p>
                    </div>

                    {/* Menu */}
                    <div className="px-4 w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-4">Menu</h3>
                        <ul className="mb-2">
                            {state.routes.map((x: any, i: any) => {
                                return (
                                    <li key={i} className="mb-1 uppercase text-decoration-none">
                                        <button className={"uppercase"} onClick={() => {
                                            navigate(x.key);
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            });
                                        }}>
                                            {t(x.title)}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="px-4 w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-4">Information</h3>
                        <p className="mb-2">Privacy Policy</p>
                        <p className="mb-2">Terms of Service</p>
                        <p>Accessibility</p>
                        {/*       <h1>Counter: {count}</h1> */}
                        <div className={"mt-4"}>
                            <LanguageSwitcher/>
                        </div>
                    </div>
                </div>

                {/* Social Logins */}
                <div className="flex justify-center mt-6">
                    <a href="#0" onClick={() => dispatch(increment())}
                       className="text-gray-400 hover:text-gray-300 mx-3"><FontAwesomeIcon icon={faFacebookF}/></a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 mx-3"><FontAwesomeIcon
                        icon={faTwitter}/></a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 mx-3"><FontAwesomeIcon icon={faInstagram}/></a>
                </div>

                {/* Copyright */}
                <div className="bg-gray-800 bg-opacity-50 mt-10 py-4 text-sm text-center">
                    <p>&copy; 2023 LakeComo. All Rights Reserved.</p>
                </div>

            </div>
        </div>
    );
};
export default Footer;
