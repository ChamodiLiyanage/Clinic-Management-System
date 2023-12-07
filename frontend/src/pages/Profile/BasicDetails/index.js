import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function BasicDetails() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <div className="container d-flex justify-content-center">
        <div className="rounded bg-secondary text-white flex flex-col p-2 w-50">
          <div className="flex justify-between mt-2">
            <h1 className="text-md">Name</h1>
            <h1 className="text-md">{user.name}</h1>
          </div>
          <div className="flex justify-between mt-2">
            <h1 className="text-md">Email</h1>
            <h1 className="text-md">{user.email}</h1>
          </div>
          <div className="flex justify-between mt-2">
            <h1 className="text-md">Phone</h1>
            <h1 className="text-md">{user.phone}</h1>
          </div>
          <div className="flex justify-between mt-2">
            <h1 className="text-md">Role</h1>
            <h1 className="text-md uppercase">{user.role}</h1>
          </div>

          <div className="flex justify-between mt-2">
            <h1 className="text-md">Registered On</h1>
            <h1 className="text-md">
              {moment(user.createdAt).format("MMM Do YYYY, h:mm a")}
            </h1>
          </div>
          {/* <div className="d-flex justify-content-center">
          <Link to="/editprofile"><button className="btn mt-2 btn-primary">Edit Profile</button></Link>

          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
