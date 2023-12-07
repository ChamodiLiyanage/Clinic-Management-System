import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Table } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllUsers } from "../../../apicalls/users";
import Button from "../../../components/Button";
import BookedAppointments from "./BookedAppointments";

function Users({ role }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBookedAppointments, setShowBookedAppointments] = useState(false);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions, record) => (
        <div>
          <Button
            title="Appointments"
            variant="outlined"
            onClick={() => {
              setSelectedUser(record);
              setShowBookedAppointments(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={users} columns={columns} />

      {showBookedAppointments && (
        <BookedAppointments
          showBookedAppointments={showBookedAppointments}
          setShowBookedAppointments={setShowBookedAppointments}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

export default Users;
