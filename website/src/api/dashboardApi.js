import api from  './axios';

export const getDashboardStats = async () =>{
    const response = await api.get(
        "/courses/dashboard/stats/"
    )
    return response.data;
};