import React from "react";
import {Fab, Theme, useScrollTrigger, Zoom} from "@mui/material";
import {makeStyles} from "@mui/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollTop(props: any) {
    const {children} = props;
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            zIndex: 999,
        },
        scrollButton: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
        fabButton: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary.dark
            },
        },
    }));
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100
    });

    const handleClick = (event: any) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        if (anchor) {
            anchor.scrollIntoView({behavior: "smooth", block: "center"});
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                <Fab className={classes.fabButton} size="small">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </div>
        </Zoom>
    );
}

export default ScrollTop;
