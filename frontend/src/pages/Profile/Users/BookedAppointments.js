import React, { useEffect } from "react";
import { Modal, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import {
  GetAllAppointments,
  GetAppointmentsByDoc,
} from "../../../apicalls/appointments";
import moment from "moment";

function BookedAppointments({
  showBookedAppointments,
  setShowBookedAppointments,
  selectedUser,
}) {
  const [bookedAppointments, setBookedAppointments] = React.useState([]);
  const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAppointmentsByDoc({
        user: selectedUser._id,
        doctorName: selectedUser.name,
      });
      dispatch(HideLoading());
      if (response.success) {
        setBookedAppointments(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Name",
      dataIndex: "patientName",
    },
    {
      title: "Contact Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "NIC",
      dataIndex: "nic",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      render: (appointmentDate) => moment(appointmentDate).format("DD-MM-YY"),
    },
    {
      title: "Appointment Time Slot",
      dataIndex: "appointmentTimeSlot",
    },
    {
      title: "Doctor's Name",
      dataIndex: "doctorName",
    },
    {
      title: "",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="doctor" width="60" height="60" />
      ),
    },

    {
      title: "Added on",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY hh:mm:A"),
    },
  ];

  return (
    <Modal
      open={showBookedAppointments}
      onCancel={() => setShowBookedAppointments(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-primary-text-xl text-center font-bold uppercase">
        {selectedUser.name}'s Booked Appointments
      </h1>

      <Table columns={columns} dataSource={bookedAppointments}></Table>
    </Modal>
  );
}

export default BookedAppointments;
