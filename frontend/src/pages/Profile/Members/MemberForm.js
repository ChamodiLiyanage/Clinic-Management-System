import { Col, Form, message, Modal, Row } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddMember, UpdateMember } from "../../../apicalls/members";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function MemberForm({
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
      console.log(values);
      //console.log(user._id)
      //values.name = user._id;
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
      title={formType === "add" ? "Add Member" : "Update Member"}
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
              rules={[{ required: true, message: "Please input image url" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                { required: true, message: "Please input age" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input email" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input phone" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input address" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Please input department" },
              ]}
            >
              < input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Position"
              name="position"
              rules={[
                { required: true, message: "Please input position" },
              ]}
            >
              <input type="text"/>
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
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default MemberForm;
