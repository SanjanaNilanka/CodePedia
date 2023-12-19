import axiosInstance from "./axiosInstance";
import { message } from "antd"


//Register user

export const RegisterUser = async(formData) => {
    try {
        const response = await axiosInstance.post("/admin/users/register", formData);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response); // Log the response for more details
        message.error(error.message);
    }
};

//Login user
export const LoginUser = async(formData) => {
    try {
        const response = await axiosInstance.post("/admin/users/login", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const GetLoggedInUserDetails = async () => {
  
    try {
      const response = await axiosInstance.get("/admin/users/get-logged-in-user");
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };