import { axiosInstance } from "./axiosInstance";

// add member
export const AddMember = async (payload) => {
  try {
    const response = await axiosInstance.post("http://localhost:5000/api/member/add-member", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all member
export const GetAllMembers = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:5000/api/member/get-all-members");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update member
export const UpdateMember = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:5000/api/member/update-member/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete member
export const DeleteMember = async (id) => {
  try {
    const response = await axiosInstance.delete(`http://localhost:5000/api/member/delete-member/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get member by id
export const GetMemberById = async (id) => {
  try {
    const response = await axiosInstance.get(`http://localhost:5000/api/member/get-member-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


