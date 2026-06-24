import api from './axios'

export const getCourses = async () =>{
    const response = await api.get("/courses/");

    return response.data;
};

export const createCourse = async(data) =>{
    const response = await api.post("/courses/", data);

    return response.data;
};

export const deleteCourse = async(id)=>{
    await api.delete(`/courses/${id}/`);
};

export const updateCourse = async (
    id,courseData
) =>{
    const response = await api.put(`/courses/${id}/`, courseData);

    return response.data
};