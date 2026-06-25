import api from "./axios";

export const loginUser = async (credentials) => {
  console.log("SENDING TO DJANGO:", credentials);
  const response = await api.post("/login/", credentials);
 

  return response.data;
};
