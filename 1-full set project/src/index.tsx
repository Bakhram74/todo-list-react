import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {createTheme, ThemeProvider} from "@mui/material";
import {green, purple} from "@mui/material/colors";
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
            <App />
            </ThemeProvider>

    </div>,
    document.getElementById('root'));
