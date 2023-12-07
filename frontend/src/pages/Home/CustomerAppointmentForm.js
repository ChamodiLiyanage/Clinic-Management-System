import React from "react";
import { Col, Form, Modal, Row, message } from "antd";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddAppointment } from "../../apicalls/appointments";
import Users from "../Profile/Users";

function CustomerAppointmentForm({ onFinish, onCancel }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Provide a default user object to avoid accessing properties on undefined
  const safeUser = user || { _id: "" };

  const handleFormSubmit = async (values) => {
    try {
      dispatch(ShowLoading());

      values.CreatedBy = safeUser._id; // Access _id property from safeUser object

      const response = await AddAppointment(values);
      if (response.success) {
        message.success(response.message);
        onFinish(); // Call the onFinish function provided by the parent to handle success
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      <Row gutter={[20]}>
        <Col span={4}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <select>
              <option value=""></option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
              <option value="Baby">Baby</option>
            </select>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            label="Patient's Name"
            name="patientName"
            rules={[{ required: true, message: "Please input Name" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Contact Number"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please input contact number" },
              {
                pattern: /^[0-9]{10}$/, // Regular expression to match a 10-digit phone number
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="NIC"
            name="nic"
            rules={[
              { required: true, message: "Please input NIC" },
              {
                len: 12, // Enforce a length of exactly 12 characters
                message: "NIC must be exactly 12 characters long",
              },
            ]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input Email" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <input type="text" placeholder="abc@gmail.com" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Appointment Date"
            name="appointmentDate"
            rules={[
              {
                required: true,
                message: "Please input Appointment Date",
              },
            ]}
          >
            <input type="date" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Appointment Time Slot"
            name="appointmentTimeSlot"
            rules={[
              {
                required: true,
                message: "Please input appointment time slot",
              },
            ]}
          >
            <select>
              <option value="">Select Time Slot</option>
              <option value="9:00 - 9.30">9:00 - 9.30</option>
              <option value="9.30 - 10.00">9.30 - 10.00</option>
              <option value="10.00 - 10.30">10.00 - 10.30</option>
              <option value="10.30 - 11.00">10.30 - 11.00</option>
              <option value="11.00 - 11.30">11.00 - 11.30</option>
              <option value="11.30 - 12.00 ">11.30 - 12.00</option>
              <option value="13.00 - 14:00">13.00 - 14:00</option>
            </select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Doctor"
            name="doctorName"
            rules={[{ required: true, message: "Please input doctor name" }]}
          >
            <select>
              <option value="">Select Doctor</option>
              <option value="Michel">Dr Michel</option>
              <option value="Steve">Dr Steve</option>
              <option value="Rachel">Dr Rachel</option>
            </select>
          </Form.Item>
        </Col>
      </Row>
      <div className="flex justify-end gap-2 mt-1">
        <Button type="button" variant="outlined" title="Cancel" />
        <Button title="Save" type="submit" />
      </div>
    </Form>
  );
}

export default CustomerAppointmentForm;
