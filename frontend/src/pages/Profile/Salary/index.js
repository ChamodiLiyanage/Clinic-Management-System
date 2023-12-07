import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import SalaryForm from "./SalaryForm";
import { GetAllSalary } from "../../../apicalls/salary";
import { DeleteSalary } from "../../../apicalls/salary";
//import moment from "moment";
//import Issues from "./Issues";
//import IssueForm from "./IssueForm";

function Salary() {
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

  
  const deleteSalary = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteSalary(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getSalary();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    
    {
      title: "Name",
      dataIndex: "name",
    },
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
    
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <i
            class="ri-delete-bin-5-line"
            onClick={() => deleteSalary(record._id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setFormType("edit");
              setSelectedSalary(record);
              setOpenSalaryForm(true);
            }}
          ></i>
    
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Add salary"
          onClick={() => {
            setFormType("add");
            setSelectedSalary(null);
            setOpenSalaryForm(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={salary} className="mt-1" />

      {openSalaryForm && (
        <SalaryForm
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

export default Salary;
