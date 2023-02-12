import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Feature/AuthSlice";


const store = configureStore({
    reducer: {
        login: AuthSlice
    }
})

export default store