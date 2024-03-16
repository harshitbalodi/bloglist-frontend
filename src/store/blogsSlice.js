import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogService";

const blogSlice = createSlice({
    name:"blogs",
    initialState:[],
    reducers:{
        setBlogs(state,action){
            return action.payload;
        }
    }
})




export const {setBlogs} = blogSlice.actions;

export const  BlogThunk=()=>{
    return async dispatch=>{
        const blogs = await blogService.getAll()
        console.log(blogs);
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    }
}
export default blogSlice.reducer;