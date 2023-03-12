import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {Provider} from "react-redux";
import {store} from "./Store";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import {deepOrange, grey, green, indigo, orange, pink, purple} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
    },
});

const baseUrl = document.getElementsByTagName("base")[0]?.getAttribute("href") ?? "";
const rootElement = document.getElementById("root") as any;
const root = createRoot(rootElement);

root.render(
    <BrowserRouter basename={baseUrl}>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </Provider>
        </I18nextProvider>
    </BrowserRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/*
reportWebVitals(console.log); */
