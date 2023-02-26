import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {makeStyles, createStyles} from '@mui/styles';
import {useSelector} from "react-redux";
import {RootState} from "../Store";

const useStyles = makeStyles((theme: any) =>
    createStyles({
        root: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.2s ease-out, visibility 0.2s ease-out',
            '&.visible': {
                opacity: 1,
                visibility: 'visible',
            },
        },
        loader: {
            color: theme.palette.primary.main,
        },
    })
);

const Loader = () => {

    const loading = useSelector((state: RootState) => state.data.loading);

    const classes = useStyles();

    return (
        <div className={`${classes.root} ${loading ? 'visible' : ''}`}>
            <CircularProgress className={classes.loader}/>
        </div>
    );
};

export default Loader;
