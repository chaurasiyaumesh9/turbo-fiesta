import React from "react";
import { User } from "./User";
interface UserListProps {
  users: Array<User>;
}

export const UsersList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map(user => {
        return <User key={user.id} user={user} />;
      })}
    </ul>
  );
};
