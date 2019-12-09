import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { TUser } from "../../Types/TUser";
interface UserListProps {
  users: Array<TUser>;
}

export const UsersListBrowser: React.FC<UserListProps> = ({ users }) => {
  let match = useRouteMatch();
  return (
    <div className="userslist browser">
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Role</th>
            <th>Creation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: TUser, index: number) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.Name}</td>
                <td>{user.Contact}</td>
                <td>{user.Email}</td>
                <td>{user.Role}</td>
                <td>{user.CreationDate}</td>
                <td>
                  {/* <Button variant="link" href={`${match.url}/${user.ID}`}>
                  Edit
                </Button> */}
                  <Link
                    className="btn btn-secondary btn-sm"
                    to={`${match.url}/${user.ID}`}
                  >
                    EDIT
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
