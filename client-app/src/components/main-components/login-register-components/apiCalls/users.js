import axiosInstance from "./axiosInstance";
import { message } from 'antd';

//Register user
 
export const RegisterUser = async(formData) =>{
    try{
        const response = await axiosInstance.post("/admin/users/register", formData);
        return response.data;
    }catch(error){
        console.error("Error:", error.response); // Log the response for more details
        message.error(error.message);
    }
};

//Login user
export const LoginUser = async(formData) =>{
    try{
        const response = await axiosInstance.post("/admin/users/login", formData);
        return response.data;
    }catch(error){
        throw error;
    }
};


// get user details

export const GetLoggedInUserDetails = async () => {
  
    try {
      const response = await axiosInstance.get("/admin/users/get-logged-in-user");
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
  export const GetUserById = async (id) => {
    console.log("error",id)
    try {
      const response = await axiosInstance.get(`/admin/users/get-user-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Update user details
  export const UpdateUserDetails = async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/admin/users/update-user/${id}`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
// Delete user by ID
export const DeleteUserById = async (id) => {
  console.log("error", id);
  try {
    const response = await axiosInstance.delete(`/admin/users/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
