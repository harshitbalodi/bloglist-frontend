import axios from "axios";
import axiosInstance from "./axios";

console.log(import.meta.env.VITE_BACKEND_URI);
const baseUrl = import.meta.env.VITE_BACKEND_URI + "/api/blogs";

const getAll = async () => {
  try {
    const response = await axiosInstance.get('/blogs');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (blogObj) => {
  const response = await axios.post(baseUrl, blogObj, {
    headers: { Authorization: token },
  });
  const data = response.data;
  console.log(data);
  return data;
};

const likeBlog = async (id) => {
  const response = await axios.put(
    baseUrl + `/${id}`,
    { likes: 5 },
    { headers: { Authorization: token } }
  );
  console.log(response.data);
  return response.data;
};

const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(baseUrl + `/${id}`, {
      headers: { Authorization: token },
    });
    console.log("Deletion:", response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default { getAll, createBlog, likeBlog, deleteBlog };
