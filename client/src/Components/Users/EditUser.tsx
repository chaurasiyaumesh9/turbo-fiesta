import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { TUser, TCloudImage, TDocument } from "../../Types/TUser";
import Col from "react-bootstrap/Col";
import { HTMLDropdown } from "../HTMLDropdown/HTMLDropdown";

const intialuser: TUser = new TUser({
  Name: "",
  AddressProof: new TDocument({}),
  CreationDate: "",
  Gender: "",
  IDProof: "",
  Inactive: false,
  Password: "",
  Contact: "",
  Email: "",
  ID: "",
  Role: "",
  Photo: new TCloudImage({})
});

export const EditUser: React.FC = () => {
  let { id } = useParams();
  const [user, setUser] = useState(intialuser);
  useEffect(() => {
    fetch("/api/users/" + id)
      .then(res => res.json())
      .then(json => {
        setUser(new TUser(json));
      });
  }, [id]);
  const RoleOptions: Array<Option> = [
    {
      label: "SELECT USER ROLE",
      value: ""
    },
    {
      label: "ADMIN",
      value: "admin"
    },
    {
      label: "ON-FIELD-USER",
      value: "on-field-user"
    },
    {
      label: "VENDOR",
      value: "vendor"
    },
    {
      label: "CUSTOMER",
      value: "customer"
    }
  ];
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key: string = e.target.name;
    const value: string = e.target.value;
    const updatedUser: TUser = Object.assign({}, user);
    switch (key) {
      case "Name":
        updatedUser.Name = value;
        break;
      case "Email":
        updatedUser.Email = value;
        break;
      case "Contact":
        updatedUser.Contact = value;
        break;
      case "Password":
        updatedUser.Password = value;
        break;
      default:
        break;
    }
    setUser(updatedUser);
  };
  const handleRoleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedUser: TUser = Object.assign({}, user);
    updatedUser.Role = e.target.value;
    setUser(updatedUser);
  };
  return (
    <div>
      <h2 className="text-center mt-3"> EDIT/UPDATE USER </h2>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label> Name </Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={user.Name || ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleUserInput(event)
              }
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label> Contact </Form.Label>
            <Form.Control
              type="text"
              name="Contact"
              value={user.Contact || ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleUserInput(event)
              }
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label> Email </Form.Label>
            <Form.Control
              type="text"
              name="Email"
              value={user.Email || ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleUserInput(event)
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <HTMLDropdown
              id="Role"
              caption="User Role/Type"
              value={user.Role}
              changeHandler={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleRoleSelection(event)
              }
              options={RoleOptions}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label> Password </Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={user.Password || ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleUserInput(event)
              }
            />
          </Form.Group>
        </Form.Row>
      </Form>

      {/* <div className="row">
        <div className="col-sm-6">{user.Gender}</div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <img src={user.Photo.URL} alt="" width="200" height="200" />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <img
            src={user.AddressProof.Document.URL}
            alt=""
            width="200"
            height="200"
          />
        </div>
        <div className="col-sm-6">
          <img
            src={user.IDProof.Document.URL}
            alt=""
            width="200"
            height="200"
          />
        </div>
      </div> */}
    </div>
  );
};
