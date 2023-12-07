import { axiosInstance } from "./axiosInstance";

//add appointment
export const AddAppointment = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5000/api/appointments/add-appointment",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get all appointments
export const GetAllAppointments = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5000/api/appointments/get-all-appointments"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update appointment
export const UpdateAppointment = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:5000/api/appointments/update-appointment/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete appointment
export const DeleteAppointment = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `http://localhost:5000/api/appointments/delete-appointment/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get appointment by id
export const GetAppointmentById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:5000/api/appointments/get-appointment-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get appointments by doctor name
export const GetAppointmentsByDoc = async (payload) => {
  try {
    console.log(payload);
    const response = await axiosInstance.get(
      `http://localhost:5000/api/appointments/get-appointment-by-doc?doctorName=${encodeURIComponent(
        payload.doctorName
      )}`,
      {
        user: payload.user,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
