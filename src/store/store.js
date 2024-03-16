import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import blogSlice from "./blogsSlice";

const store = configureStore({
    reducer:{
        blogs:blogSlice,
        user:userSlice
    }
})

export default store;