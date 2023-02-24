﻿import React, {useState} from "react";
import {Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {routes} from "../Globals";
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Iso} from "@material-ui/icons";
import {ListItemIcon} from "@material-ui/core";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons/faCaretRight";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

function Navbar() {

    const drawerWidth = 250;

    const useStyles = makeStyles((theme) => ({
        list: {
            width: 250,
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        paper: {
            background: theme.palette.primary.main
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            backgroundColor: "white",
        },
        logo: {
            height: '50px',
        },
        footerContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
        },
        footerText: {
            color: 'white',
        },
    }));

    const classes = useStyles();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav>
                <div className="flex justify-content-between w-100 lg:px-8">
                    <div className="lg:border-b flex items-center justify-between w-full">
                        <div className="flex-shrink-0 bg-white p-1 mb-2">
                            <img
                                className="w-36"
                                src="logo.png"
                                alt="Workflow"
                            />
                        </div>
                        <div className="bg-black/[0] hidden lg:block align-self-end">
                            <div className="flex items-baseline">
                                {routes.map((x, i) => {
                                    return (<a key={i} href={x.key}
                                               className="hover:border-b-white border-b-2 border-transparent hover:text-white px-3 py-2 text-sm font-bold text-white">
                                        {t(x.title)}
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

                <Drawer anchor="right" open={isOpen} onClose={(e) => {
                    setIsOpen(false);
                }}
                    //classes={{ paper: classes.paper }}
                >
                    <div className={classes.logoContainer}>
                        <img src="logo.png" alt="Logo" className={classes.logo}/>
                    </div>
                    <div className={classes.list} role="presentation">
                        <List>
                            {routes.map((x, i) => {
                                return (<ListItem className={""} key={i} button onClick={() => {
                                }}>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                    </ListItemIcon>
                                    <ListItemText onClick={() => {
                                        setIsOpen(false);
                                        navigate(x.key);
                                    }} className={"uppercase"} primary={t(x.title)}/>
                                </ListItem>)
                            })}
                        </List>
                    </div>
                    <div className={classes.footerContainer}>
                        <p className={classes.footerText}>Copyright © 2023</p>
                    </div>
                </Drawer>
            </nav>
        </div>
    );
}

export default Navbar;