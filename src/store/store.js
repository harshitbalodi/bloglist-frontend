import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogsSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        blogs:blogSlice,
        user:userSlice
    }
})

export default store;