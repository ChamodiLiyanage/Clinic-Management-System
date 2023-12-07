import React, { useState } from "react";
import { Col, Form, Modal, Row, message } from "antd";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddAppointment } from "../../apicalls/appointments";
import Users from "../Profile/Users";
import CustomerAppointmentForm from "./CustomerAppointmentForm";
import RachelImage from "./images/Rachel.jpg";
import MichelImage from "./images/Michel.jpg";
import SteveImage from "./images/Steve.jpg";

function Home() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const role = user.role;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showCustomerAppointmentForm = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values.CreatedBy = user._id;
      let response = null;
      response = await AddAppointment(values);
      if (response.success) {
        message.success(response.message);
        setIsModalVisible(false);
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
    <div>
      <div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <div className="rounded bg-white p-2 shadow flex flex-col gap-1 mt-2">
            <img src={RachelImage} className="img-fluid" alt="Dr Rachel" />
              <h1 className="text-md text-secondary font-bold">Dr Rachel</h1>
              <p>Specialization: Dermatologist</p>
              <Button
                title="Book an appointment"
                type="button"
                onClick={showCustomerAppointmentForm}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <div className="rounded bg-white p-2 shadow flex flex-col gap-1 mt-2">
              <img src={MichelImage}  className="img-fluid"/>
              <h1 className="text-md text-secondary font-bold">Dr Michel</h1>
              <p>Specialization: EMT</p>
              <Button
                title="Book an appointment"
                type="button"
                onClick={showCustomerAppointmentForm}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <div className="rounded bg-white p-2 shadow flex flex-col gap-1 mt-2">
              <img src={SteveImage}  className="img-fluid" />
              <h1 className="text-md text-secondary font-bold">Dr Steve</h1>
              <p>Specialization: Abdomen</p>
              <Button
                title="Book an appointment"
                type="button"
                onClick={showCustomerAppointmentForm}
              />
            </div>
          </Col>
        </Row>
      </div>

      {role === "patient" && (
        <div>
          <Modal
            title="Book an Appointment"
            open={isModalVisible}
            onCancel={handleCancel}
            centered
            width={800}
            footer={null}
          >
            <CustomerAppointmentForm
              onFinish={onFinish}
              onCancel={handleCancel}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Home;
