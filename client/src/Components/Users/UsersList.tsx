import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { User } from "./User";
import TypeUser from "./TypeUser";
interface UserListProps {
  users: Array<TypeUser>;
}

export const UsersList: React.FC<UserListProps> = ({ users }) => {
  console.log("users", users);
  return (
    <MDBTable striped>
      <MDBTableHead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Role</th>
          <th>Creation Date</th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map(user => {
          return <User key={user.ID} user={user} />;
        })}
      </MDBTableBody>
    </MDBTable>
  );
};
