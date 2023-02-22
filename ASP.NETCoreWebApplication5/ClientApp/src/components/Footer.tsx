﻿import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="bg-gray-900 text-gray-300 pt-10">
            <div className="mx-auto">
                <div className="flex flex-wrap -mx-4">
                    {/* Contacts */}
                    <div className="px-4 w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-4">Contacts</h3>
                        <p className="mb-2">123 Main Street</p>
                        <p className="mb-2">New York, NY 10001</p>
                        <p className="mb-2">(555) 555-5555</p>
                        <p>email@example.com</p>
                    </div>

                    {/* Menu */}
                    <div className="px-4 w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-4">Menu</h3>
                        <ul className="mb-2">
                            <li className="mb-1"><a href="#">Home</a></li>
                            <li className="mb-1"><a href="#">About</a></li>
                            <li className="mb-1"><a href="#">Services</a></li>
                            <li className="mb-1"><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="px-4 w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-4">Information</h3>
                        <p className="mb-2">Privacy Policy</p>
                        <p className="mb-2">Terms of Service</p>
                        <p>Accessibility</p>
                    </div>
                </div>

                {/* Social Logins */}
                <div className="flex justify-center mt-6">
                    <a href="#" className="text-gray-400 hover:text-gray-300 mx-3"><FontAwesomeIcon icon={faFacebookF}/></a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 mx-3"><FontAwesomeIcon
                        icon={faTwitter}/></a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 mx-3"><FontAwesomeIcon icon={faInstagram}/></a>
                </div>

                {/* Copyright */}
                <div className="bg-gray-800 bg-opacity-50 mt-10 py-4 text-sm text-center">
                    <p>&copy; 2023 My Website. All Rights Reserved.</p>
                </div>
                
            </div>
        </div>
    );
};

export default Footer;