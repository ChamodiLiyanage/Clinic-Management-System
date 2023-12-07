import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  DeleteAppointment,
  GetAllAppointments,
} from "../../../apicalls/appointments";
import { Col, message, Row, Table } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import AppointmentForm from "./AppointmentForm";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

function Appointments() {
  const [formType, setFormType] = useState("add");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAppointmentForm, setOpenAppointmentForm] = React.useState(false);
  const [appointments, setAppointments] = React.useState([]);
  const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllAppointments();
      dispatch(HideLoading());
      if (response.success) {
        setAppointments(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ["Title", "Name", "Contact Number", "NIC", "Email", "Appointment Date", "Appointment Time Slot", "Doctor's Name", "Added on"]
      ],
      body: filteredAppointments.map((appointment) => [
        appointment.title,
        appointment.patientName,
        appointment.mobileNumber,
        appointment.nic,
        appointment.email,
        moment(appointment.appointmentDate).format("DD-MM-YY"),
        appointment.appointmentTimeSlot,
        appointment.doctorName,
        moment(appointment.createdAt).format("DD-MM-YYYY hh:mm:A")
      ]),
    });
    doc.save("appointments_report.pdf");
  };
  
  useEffect(() => {
    getAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteAppointment(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getAppointments();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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
      title: "Added on",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY hh:mm:A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <button
            className="btn btn-secondary"
            variant="secondary"
            onClick={() => {
              setFormType("edit");
              setSelectedAppointment(record);
              setOpenAppointmentForm(true);
            }}
          >
           <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn btn-danger"
            variant="danger"
            onClick={() => deleteAppointment(record._id)}
          >
           <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.nic.includes(searchQuery)
  );

  return (
    <div>
      <div className="flex justify-end mt-2">
        <Button
          title="Add Appointment"
          onClick={() => {
            setFormType("add");
            setSelectedAppointment(null);
            setOpenAppointmentForm(true);
          }}
        ></Button>
      </div>
      <div className="flex justify-left ">
        <Input
          size="large"
          placeholder="search by NIC"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<UserOutlined />}
          style={{ width: "500px" }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredAppointments}
        className="mt-2"
      />
      <Button
        title="Generate Report"
        onClick={generatePDFReport}
        icon={<FontAwesomeIcon icon={faFilePdf} />}
        className="ml-2 mt-2"
      ></Button>

      {openAppointmentForm && (
        <AppointmentForm
          open={openAppointmentForm}
          setOpen={setOpenAppointmentForm}
          reloadAppointments={getAppointments}
          formType={formType}
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
        />
      )}
    </div>
  );
}

export default Appointments;
