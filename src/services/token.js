let token = null;

const setToken = (newToken) => {
  if (newToken) token = `${newToken}`;
  else token = null;
};

const getToken = () => {
  return token;
};

export default {setToken, getToken};