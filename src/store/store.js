import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogsSlice";
import userSlice from "./userSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
    reducer:{
        blogs:blogSlice,
        user:userSlice,
        notification:notificationSlice
    }
})

export default store;