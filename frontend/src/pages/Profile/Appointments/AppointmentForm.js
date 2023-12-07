import { Col, Form, Modal, Row, message } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAppointment,
  UpdateAppointment,
} from "../../../apicalls/appointments";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function AppointmentForm({
  open,
  setOpen,
  reloadAppointments,
  setFormType,
  formType,
  selectedAppointment,
  setSelectedAppointment,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values.CreatedBy = user._id;
      let response = null;
      if (formType == "add") {
        response = await AddAppointment(values);
      } else {
        values._id = selectedAppointment._id;
        response = await UpdateAppointment(values);
      }
      if (response.success) {
        message.success(response.message);
        reloadAppointments();
        setOpen(false);
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
    <Modal
      title={formType == "add" ? "Add Appointment" : "Update Appointment"}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedAppointment}
      >
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
                { required: true, message: "Please input Appointment Date" },
                {
                  type: "date",
                  message: "Please select a valid date",
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
          {/* <Col span={24}>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ required: true, message: "Please input image url" }]}
            >
              <input
               type="text"
               value="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q="
              />
            </Form.Item>
          </Col> */}
        </Row>
        <div className="flex justify-end gap-2 mt-1">
          <Button
            type="button"
            variant="outlined"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default AppointmentForm;
