import { Col, Form, message, Modal, Row } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddSalary, UpdateSalary } from "../../../apicalls/salary";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function SalaryView({
  open,
  setOpen,
  reloadSalary,
  setFormType,
  formType,
  selectedSalary,
  setSelectedSalary,
}) {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        values.availableCopies = values.totalCopies;
        response = await AddSalary(values);
      } else {
        values._id = selectedSalary._id;
        response = await UpdateSalary(values);
      }
      if (response.success) {
        message.success(response.message);
        reloadSalary();
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
      title="Staff View"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...selectedSalary,
          publishedDate: selectedSalary?.publishedDate
            ? new Date(selectedSalary.publishedDate).toISOString().split("T")[0]
            : null,
        }}
      >
        <Row gutter={[20]}>
          
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              
            >
              <input type="text" readOnly="true" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Basic Salary"
              name="basic_sal"
              rules={[
              ]}
            >
              <input type="text" readOnly="true" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
             label="Over Time"
             name="over_time"
            >
              <input type="text" readOnly="true" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Total Salary"
              name="tot_sal"
            >
              <input type="text" readOnly="true"/>
            </Form.Item>
          </Col>
          
          
        </Row>

        <div className="flex justify-end gap-2 mt-1">
          <Button
            type="button"
            variant="outlined"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default SalaryView;