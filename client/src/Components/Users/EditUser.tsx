import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TUser, TCloudImage, TDocument } from "../../Types/TUser";

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
  return (
    <div>
      <h2 className="text-center mt-3"> EDIT/UPDATE USER </h2>
      <div className="row">
        <div className="col-sm-6">{user.Name}</div>
        <div className="col-sm-6">{user.Contact}</div>
      </div>
      <div className="row">
        <div className="col-sm-6">{user.Email}</div>
        <div className="col-sm-6">{user.Gender}</div>
      </div>
      <div className="row">
        <div className="col-sm-6">{user.Password}</div>
        <div className="col-sm-6">{user.Role}</div>
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
      </div>
    </div>
  );
};
