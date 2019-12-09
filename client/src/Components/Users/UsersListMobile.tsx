import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { TUser } from "../../Types/TUser";
interface UserListProps {
  users: Array<TUser>;
}

export const UsersListMobile: React.FC<UserListProps> = ({ users }) => {
  let match = useRouteMatch();
  return (
    <div className="userslist mobile">
      {users.map((user: TUser, index: number) => {
        return (
          <>
            <Card>
              <Card.Header>{user.Role}</Card.Header>
              <Card.Img variant="top" src={user.Photo.URL} />
              <Card.Body>
                <Card.Title> {user.Name}</Card.Title>
                <Card.Text>{user.Contact}</Card.Text>
                <Card.Text>{user.Email}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link
                  className="btn btn-secondary"
                  to={`${match.url}/${user.ID}`}
                >
                  EDIT
                </Link>
              </Card.Footer>
            </Card>
            <hr />
          </>
        );
      })}
    </div>
  );
};
