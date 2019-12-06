import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import { UsersList } from "./UsersList";
import TypeUser from "./TypeUser";

// const users: Array<User> = [
//   { id: "1", name: "Umesh" },
//   { id: "2", name: "Manish" },
//   { id: "3", name: "Abhishek" }
// ];
const intialusers: Array<TypeUser> = [];
export const Users: React.FC = () => {
  const [users, setUsers] = useState(intialusers);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        setUsers(
          json.map((user: any) => {
            return new TypeUser(user);
          })
        );
      });
  }, [true]);
  return (
    <div>
      <h2 className="text-center mt-3"> MANAGE USERS </h2>
      <UsersList users={users} />
    </div>
  );
};
