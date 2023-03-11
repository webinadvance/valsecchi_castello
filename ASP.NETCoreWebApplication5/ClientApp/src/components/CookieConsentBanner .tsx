import React, {useState, useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {Drawer, Box, Typography, Button, Theme} from '@mui/material';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const ALLOWED_COOKIES = ['functional', 'analytics', 'marketing'];

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        bottom: 0,
        position: 'fixed',
    },
    drawerPaper: {
        background: theme.palette.grey[900],
        color: theme.palette.common.white,
        padding: theme.spacing(2),
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

const CookieConsentBanner = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(true);
    const [allowFunctionalCookies, setAllowFunctionalCookies] = useState(false);
    const [allowAnalyticsCookies, setAllowAnalyticsCookies] = useState(false);
    const [allowMarketingCookies, setAllowMarketingCookies] = useState(false);

    useEffect(() => {
        const cookieConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (cookieConsent) {
            const parsedConsent = JSON.parse(cookieConsent);
            setAllowFunctionalCookies(parsedConsent.functional);
            setAllowAnalyticsCookies(parsedConsent.analytics);
            setAllowMarketingCookies(parsedConsent.marketing);
            setIsOpen(false);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSave = () => {
        const cookieConsent = {
            functional: allowFunctionalCookies,
            analytics: allowAnalyticsCookies,
            marketing: allowMarketingCookies,
        };
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(cookieConsent));
        setIsOpen(false);
    };

    const handleToggleFunctionalCookies = () => {
        setAllowFunctionalCookies(!allowFunctionalCookies);
    };

    const handleToggleAnalyticsCookies = () => {
        setAllowAnalyticsCookies(!allowAnalyticsCookies);
    };

    const handleToggleMarketingCookies = () => {
        setAllowMarketingCookies(!allowMarketingCookies);
    };

    useEffect(() => {
        const allowed = ALLOWED_COOKIES.every(
            (cookieType) => (cookieType === 'functional' && allowFunctionalCookies) ||
                (cookieType === 'analytics' && allowAnalyticsCookies) ||
                (cookieType === 'marketing' && allowMarketingCookies),
        );
        setIsOpen(!allowed);
    }, [allowFunctionalCookies, allowAnalyticsCookies, allowMarketingCookies]);

    return (
        <Drawer
            anchor="bottom"
            open={isOpen}
            onClose={() => {
            }}
            classes={{
                root: classes.drawer,
                paper: classes.drawerPaper,
            }}
        >
            <Box>
                <Typography variant="h6" gutterBottom>
                    We use cookies to enhance your experience
                </Typography>
                <Typography variant="body1" gutterBottom>
                    We use cookies to personalise content and ads, to provide social media features and to analyse our
                    traffic. We also share information about your use of our site with our social media, advertising and
                    analytics partners who may combine it with other information that you’ve provided to them or
                    thatthey’ve collected from your use of their services.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please select the types of cookies you would like to allow:
                </Typography>
                <Box>
                    <Button
                        variant={allowFunctionalCookies ? 'contained' : 'outlined'}
                        onClick={handleToggleFunctionalCookies}
                        className={classes.button}
                    >
                        Functional Cookies
                    </Button>
                    <Button
                        variant={allowAnalyticsCookies ? 'contained' : 'outlined'}
                        onClick={handleToggleAnalyticsCookies}
                        className={classes.button}
                    >
                        Analytics Cookies
                    </Button>
                    <Button
                        variant={allowMarketingCookies ? 'contained' : 'outlined'}
                        onClick={handleToggleMarketingCookies}
                        className={classes.button}
                    >
                        Marketing Cookies
                    </Button>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={handleClose} className={classes.button}>
                        Disagree
                    </Button>
                    <Button variant="contained" onClick={handleSave} className={classes.button}>
                        Agree
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CookieConsentBanner;
