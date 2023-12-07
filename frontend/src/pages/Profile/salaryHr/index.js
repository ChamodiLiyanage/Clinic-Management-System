import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import SalaryForm from "./salaryView";
import { GetAllSalary } from "../../../apicalls/salary";
import { DeleteSalary } from "../../../apicalls/salary";
import SalaryView from "./salaryView";

function SalaryHr() {
  const [formType, setFormType] = useState("add");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [openSalaryForm, setOpenSalaryForm] = React.useState(false);
  const [openIssuesForm, setOpenIssuesForm] = React.useState(false);
  const [salary, setSalary] = React.useState([]);
  const dispatch = useDispatch();

  const getSalary = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllSalary();
      dispatch(HideLoading());
      if (response.success) {
        setSalary(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getSalary();
  }, []);

  const columns = [
    {
        title: "Basic Salary",
        dataIndex: "basic_sal",
        //render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
      },
      {
        title: "Over Time",
        dataIndex: "over_time",
      },
      {
        title: "Total Salary",
        dataIndex: "tot_sal",
      },
      
  ];
  return (
    <div>
      <div className="flex justify-end">
      </div>

      <Table columns={columns} dataSource={salary} className="mt-1" />

      {openSalaryForm && (
        <SalaryView
          open={openSalaryForm}
          setOpen={setOpenSalaryForm}
          reloadMembers={getSalary}
          formType={formType}
          selectedMember={selectedSalary}
          setSelectedMember={setSelectedSalary}
        />
      )}
    </div>
  );
}

export default SalaryHr;