import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import MemberForm from "./MemberForm";
import { GetAllMembers } from "../../../apicalls/members";
import { DeleteMember } from "../../../apicalls/members";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit, faFilePdf } from '@fortawesome/free-solid-svg-icons';
//import moment from "moment";
//import Issues from "./Issues";
//import IssueForm from "./IssueForm";

function Members() {
  const [formType, setFormType] = useState("add");
  const [selectedMember, setSelectedMember] = useState(null);
  const [openMemberForm, setOpenMemberForm] = React.useState(false);
  const [openIssuesForm, setOpenIssuesForm] = React.useState(false);
  const [members, setMembers] = React.useState([]);
  const dispatch = useDispatch();

  const getMembers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMembers();
      dispatch(HideLoading());
      if (response.success) {
        setMembers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const deleteMember = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteMember(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getMembers();
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
      title: "Member",
      dataIndex: "image",
      render: (image) => <img src={image} alt="member" width="60" height="60" />,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
           <button
            className="btn btn-secondary"
            variant="secondary"
            onClick={() => {
              setFormType("edit");
              setSelectedMember(record);
              setOpenMemberForm(true);
            }}
          >
           <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn btn-danger"
            variant="danger"
            onClick={() => deleteMember(record._id)}
          >
           <FontAwesomeIcon icon={faTrash} />
          </button>
    
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Add member"
          onClick={() => {
            setFormType("add");
            setSelectedMember(null);
            setOpenMemberForm(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={members} className="mt-1" />

      {openMemberForm && (
        <MemberForm
          open={openMemberForm}
          setOpen={setOpenMemberForm}
          reloadMembers={getMembers}
          formType={formType}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      )}
    </div>
  );
}

export default Members;
