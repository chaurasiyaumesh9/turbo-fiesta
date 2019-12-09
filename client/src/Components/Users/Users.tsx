import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import { UsersListBrowser } from "./UsersListBrowser";
import { TUser } from "../../Types/TUser";
import { UsersListMobile } from "./UsersListMobile";

const intialusers: Array<TUser> = [];
export const Users: React.FC = () => {
  const [users, setUsers] = useState(intialusers);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        setUsers(
          json.map((user: any) => {
            return new TUser(user);
          })
        );
      });
  }, [true]);
  return (
    <div>
      <h2 className="text-center mt-3"> MANAGE USERS </h2>
      <UsersListBrowser users={users} />
      <UsersListMobile users={users} />
    </div>
  );
};
