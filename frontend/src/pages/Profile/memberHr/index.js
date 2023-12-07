import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import MemberForm from "./memberViewForm";
import { GetAllMembers } from "../../../apicalls/members";
import { DeleteMember } from "../../../apicalls/members";

function MembersHr() {
  const [formType, setFormType] = useState("add");
  const [selectedMember, setSelectedMember] = useState(null);
  const [openMemberForm, setOpenMemberForm] = React.useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]); // Changed state name
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = React.useState([]);
  const dispatch = useDispatch();

  const getMembers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMembers();
      dispatch(HideLoading());
      if (response.success) {
        setMembers(response.data);
        setFilteredMembers(response.data); // Initialize filteredMembers with all members
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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredMembers([...members]); // Set the filtered members to all members
    } else {
      const filtered = members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredMembers(filtered); // Set the filtered members based on the query
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
          <i
            className="ri-stack-fill"
            onClick={() => {
              setFormType("edit");
              setSelectedMember(record);
              setOpenMemberForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end"></div>
      <div className="col-3">
        <form>
          <div className="p-1 bg-light d-flex shadow-sm mb-4">
            <div className="input-group">
              <input
                type="search"
                placeholder="Search"
                aria-describedby="button-addon1"
                className="form-control border-0 bg-light"
                style={{ width: '200px' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-dark"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <Table columns={columns} dataSource={filteredMembers} className="mt-1" /> {/* Use filteredMembers here */}
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

export default MembersHr;
