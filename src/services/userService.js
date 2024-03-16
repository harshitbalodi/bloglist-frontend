import axios from "axios";
//for deployment 
const baseUrl = "https://favoriteblogs.onrender.com/api/users";
//for testing
// const baseUrl = 'http://localhost:3003/api/blogs'

const createUser = async (userObj)=>{
    const response = await axios.post(baseUrl,userObj);
    return response;
}

export default {createUser}