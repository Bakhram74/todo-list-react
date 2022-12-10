import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {green, purple} from "@mui/material/colors";
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppWithRedux from "./AppWithRedux";

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});
ReactDOM.render(
    <div>
        <ThemeProvider theme={theme}>
            {/*<App />*/}
            <Provider store={store}>
                <AppWithRedux/>
                {/*<AppSimple/>*/}
            </Provider>
        </ThemeProvider>

    </div>,
    document.getElementById('root'));
