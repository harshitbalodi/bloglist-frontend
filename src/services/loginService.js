import axios from "axios"
import token from "./token";
import axiosInstance from "./axios";
const baseUrl =import.meta.env.VITE_BACKEND_URI+ "/api/login"

const login = async (obj)=>{
    console.log(obj);
    try{
    const response= await axiosInstance.post('/login', obj);
    console.log(response.data);
    console.log("inside login service", response.data.accessToken);
    token.setToken(response.data.accessToken);
    return response.data;
    }catch(error){
        console.error("error inside loginservice.jsx",error.message);
        throw error;
    }
}

const refresh = async () => {
  try {
    const response = await axiosInstance.get("/login/refresh");
    token.setToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default {login};
