import token from "./token";
import axiosInstance from "./axios";

const login = async (obj)=>{
    console.log(obj);
    try{
    const response= await axiosInstance.post('/auth/login', obj);
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
    const response = await axiosInstance.get("/auth/refresh");
    console.log("response from refresh",response);
    token.setToken(response.data.accessToken);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout =  async () =>{
   await axiosInstance.get('/auth/logout');
}
export default {login,refresh, logout};
