import React, { useState, useEffect } from "react";
import { Col, Form, message, Modal, Row } from "antd";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddSalary, UpdateSalary } from "../../../apicalls/salary";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import "./SalaryForm.css";

function SalaryForm({
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
  const [basicSalary, setBasicSalary] = useState("");
  const [overTime, setOverTime] = useState("");
  const [totalSalary, setTotalSalary] = useState("");
  const [overTimeSal, setOverTimeSal] = useState("");
  const [etf, setEtf] = useState("");
  const [epf, setEpf] = useState("");

  const handleBasicSalaryChange = (e) => {
    const newBasicSalary = parseFloat(e.target.value) || 0;
    setBasicSalary(newBasicSalary);

    const etfcal = (newBasicSalary * 3) / 100;
    const epfcal = (newBasicSalary * 8) / 100;
    const calculatedTotalSalary = newBasicSalary + overTime * 1000 - etfcal -epfcal;
    setEpf(epfcal.toFixed(2));
    setEtf(etfcal.toFixed(2));
    setTotalSalary(calculatedTotalSalary.toFixed(2));
    console.log(totalSalary);
  };

  const handleOverTimeChange = (e) => {
    const newOverTime = parseFloat(e.target.value) || 0;
    setOverTime(newOverTime);

    const etfcal = (basicSalary * 3) / 100;
    const epfcal = (basicSalary * 8) / 100;
    const overtimeSalary = newOverTime * 1000;
    setOverTimeSal(overtimeSalary.toFixed(2));
    const calculatedTotalSalary = basicSalary + newOverTime * 1000 - epfcal - etfcal;
    setTotalSalary(calculatedTotalSalary.toFixed(2));
   
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      console.log(values);

      var tot_sal = totalSalary;

      values.tot_sal = tot_sal;

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
      title={formType === "add" ? "Add Salary" : "Update Salary"}
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
            ? new Date(selectedSalary?.publishedDate)
                .toISOString()
                .split("T")[0]
            : null,
          basic_sal: basicSalary, // Initialize basic_sal
          over_time: overTime, // Initialize over_time
        }}
      >
        <Row gutter={[20]}>
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
              label="Basic Salary"
              name="basic_sal"
              rules={[{ required: true, message: "Please input basic salary" }]}
            >
              <input
                type="number"
                value={basicSalary}
                onChange={handleBasicSalaryChange}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Over Time"
              name="over_time"
              rules={[{ required: true, message: "Please input over time" }]}
            >
              <input
                type="number"
                value={overTime}
                onChange={handleOverTimeChange} // Handle changes in Over Time input
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <div className="labels">
              Over Time Salary <br />
            </div>

            <div className="display-value">{overTimeSal}</div>
          </Col>

          <Col span={24}>
            <div className="labels">
              ETF <br />
            </div>

            <div className="display-value">{etf}</div>
          </Col>

          <Col span={24}>
            <div className="labels">
              EPF <br />
            </div>

            <div className="display-value">{epf}</div>
          </Col>

          <Col span={24}>
            <div className="labels">
              Total Salary <br />
            </div>

            <div className="display-value">{totalSalary}</div>
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

export default SalaryForm;
