import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URI+"api/users";

const createUser = async (userObj)=>{
    const response = await axios.post(baseUrl,userObj);
    return response;
}

export default {createUser}