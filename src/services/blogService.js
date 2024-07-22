import axiosInstance from "./axios";

const blogUrl = "/blogs";

const getAll = async () => {
  try {
    const response = await axiosInstance.get(blogUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

const createBlog = async (blogObj) => {
  try {
    const response = await axiosInstance.post(blogUrl, blogObj);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

const toggleLikeBlog = async (id) => {
  try {
    const response = await axiosInstance.put(`${blogUrl}/like/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(`${blogUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

const blogService = { getAll, createBlog, toggleLikeBlog, deleteBlog };

export default blogService;
