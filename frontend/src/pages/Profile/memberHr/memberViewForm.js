import { Col, Form, message, Modal, Row } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddMember, UpdateMember } from "../../../apicalls/members";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function MemberViewForm({
  open,
  setOpen,
  reloadMembers,
  setFormType,
  formType,
  selectedMember,
  setSelectedMember,
}) {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        values.availableCopies = values.totalCopies;
        response = await AddMember(values);
      } else {
        values._id = selectedMember._id;
        response = await UpdateMember(values);
      }
      if (response.success) {
        message.success(response.message);
        reloadMembers();
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
          ...selectedMember,
          publishedDate: selectedMember?.publishedDate
            ? new Date(selectedMember?.publishedDate).toISOString().split("T")[0]
            : null,
        }}
      >
        <Row gutter={[20]}>
          <Col span={24}>
              <Form.Item
                label="Image URL"
                name="image"
                
              >
                <input type="image" readOnly="true"/>
              </Form.Item>
            </Col>
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
              label="Age"
              name="age"
              rules={[
              ]}
            >
              <input type="text" readOnly="true" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
            >
              <input type="text" readOnly="true" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Phone"
              name="phone"
            >
              <input type="text" readOnly="true"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
            >
              <input type="text" readOnly="true" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Department"
              name="department"
            >
              <input type="text" readOnly="true" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Position"
              name="position"
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

export default MemberViewForm;
