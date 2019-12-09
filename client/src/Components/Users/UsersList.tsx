import React from "react";
import { User } from "./User";
import TypeUser from "./TypeUser";
interface UserListProps {
  users: Array<TypeUser>;
}

export const UsersList: React.FC<UserListProps> = ({ users }) => {
  console.log("users", users);
  return (
    <table className="table striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Role</th>
          <th>Creation Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return <User key={user.ID} user={user} />;
        })}
      </tbody>
    </table>
  );
};
