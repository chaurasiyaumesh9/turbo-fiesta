import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import TypeUser from "./TypeUser";
interface UserProps {
  user: TypeUser;
}

export const User: React.FC<UserProps> = ({ user }) => {
  let match = useRouteMatch();
  return (
    <tr>
      <td>{user.Name}</td>
      <td>{user.Contact}</td>
      <td>{user.Email}</td>
      <td>{user.Role}</td>
      <td>{user.CreationDate}</td>
      <td>
        <Link to={`${match.url}/${user.ID}`}>EDIT</Link>
      </td>
    </tr>
  );
};
