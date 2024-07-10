import axiosInstance from "./axios";

const sendRequest = async (userId) => {
  const response = await axiosInstance.post(`/friends/request/${userId}`);
  return response.data;
};

const acceptRequest = async (userId) => {
  const response = await axiosInstance.post(`/friends/accept/${userId}`);
  return response.data;
};

const rejectRequest = async (userId) => {
  const response = await axiosInstance.post(`/friends/reject/${userId}`);
  return response.data;
};

const fetchRequests = async (currentUserId) => {
  const response = await axiosInstance.get(`/friends/requests`, {
    params: { currentUserId },
  });
  return response.data;
};

const fetchFriends = async (currentUserId) => {
  const response = await axiosInstance.get(`/friends`, {
    params: { currentUserId },
  });
  return response.data;
};

export default {
  sendRequest,
  acceptRequest,
  rejectRequest,
  fetchRequests,
  fetchFriends,
};
