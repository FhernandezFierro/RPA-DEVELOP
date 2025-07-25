import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { rpaSlice } from "./rpa/rpaSlice";
import { appSlice } from "./app";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        rpa: rpaSlice.reducer,
        app: appSlice.reducer,
    },
});