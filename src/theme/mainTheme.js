import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const mainTheme = createTheme({
    palette:{
        primary:{
            main:'#1C2536'
        },
        secondary:{
            main:'#4a6d88'
        },
        background:{
            main:'#d5d9e0'
        },
        error:{
            main:'#f27474'
        },
        success:{
            main:'#a5dc86'
        },
        warning:{
            main:'#f8bb86'
        }
        
    }
})