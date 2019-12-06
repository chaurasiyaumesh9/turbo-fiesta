import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
interface UserProps {
  user: User;
}

export const User: React.FC<UserProps> = ({ user }) => {
  let match = useRouteMatch();
  return (
    <li>
      <p className="userid">
        <Link to={`${match.url}/${user.id}`}>
          {" "}
          <b>{user.id}</b>
        </Link>
      </p>
      <p className="username"> {user.name}</p>
    </li>
  );
};
