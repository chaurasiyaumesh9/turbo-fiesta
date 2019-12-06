import React from "react";

import { UsersList } from "./UsersList";

const users: Array<User> = [
  { id: "1", name: "Umesh" },
  { id: "2", name: "Manish" },
  { id: "3", name: "Abhishek" }
];
export const Users: React.FC = () => {
  return (
    <div className="container">
      <h2> MANAGE USERS </h2>
      <UsersList users={users} />
    </div>
  );
};
