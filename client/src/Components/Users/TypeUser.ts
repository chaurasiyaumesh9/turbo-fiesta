/*class CloudinaryDocument {
  URL: string;
  SecureURL: string;

  constructor(documentobj: any) {
    this.URL = documentobj.url;
    this.SecureURL = documentobj.secure_url;
  }
}

class AddressProof {
  Type: string;
  Document: CloudinaryDocument;
  constructor(addressproofobj: any) {
    this.Type = addressproofobj.type;
    this.Document = addressproofobj.document;
  }
}*/

class TypeUser {
  Name: string;
  AddressProof: any;
  CreationDate: Date;
  Gender: string;
  IDProof: any;
  Inactive: boolean;
  Password: string;
  Contact: string;
  Email: string;
  ID: string;
  Role: string;

  constructor(userobj: any) {
    this.Name = userobj["accountHolderName"];
    this.AddressProof = userobj["addressProof"];
    this.CreationDate = userobj["signUpDate"];
    this.Gender = userobj["gender"];
    this.IDProof = userobj["idProof"];
    this.Inactive = userobj["isDeleted"];
    this.Password = userobj["password"];
    this.Contact = userobj["contact"];
    this.Email = userobj["email"];
    this.ID = userobj["_id"];
    this.Role = userobj["userType"];
  }
}
export default TypeUser;
