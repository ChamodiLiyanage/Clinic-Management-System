import React from "react";
import { Tabs } from "antd";
import Appointments from "./Appointments";
import Users from "./Users";
import Reports from "./Reports";
import { useSelector } from "react-redux";
import BasicDetails from "./BasicDetails";

const TabPane = Tabs.TabPane;

function Profile() {
  const { user } = useSelector((state) => state.users);
  const role = user.role;
  return (
    <div className="container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <BasicDetails />
        </TabPane>
        {role === "patient" && (
          <TabPane tab="My Appointments" key="2">
            <Appointments />
          </TabPane>
        )}
        {role !== "patient" && (
          <TabPane tab="Appointments" key="3">
            <Appointments />
          </TabPane>
        )}

        {role !== "patient" && (
          <TabPane tab="Patients" key="4">
            <Users role="patient" />
          </TabPane>
        )}
        {role === "receptionist" && (
          <TabPane tab="Receptionists" key="5">
            <Users role="receptionist" />
          </TabPane>
        )}
        {role === "receptionist" && (
          <TabPane tab="Doctors" key="6">
            <Users role="doctor" />
          </TabPane>
        )}
        {role === "receptionist" && (
          <TabPane tab="Reports" key="7">
            <Reports />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
