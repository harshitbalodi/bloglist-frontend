import axios from "axios"

const baseUrl ="https://favoriteblogs.onrender.com/api/login"

const login = async (obj)=>{
    console.log(obj);
    try{
    const response= await axios.post(baseUrl, obj);
    console.log(response.data);
    return response.data;
    }catch(error){
        console.error(error);
    }
    
}

export default {login};
