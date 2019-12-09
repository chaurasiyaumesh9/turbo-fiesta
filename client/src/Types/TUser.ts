export class TCloudImage {
  URL?: string;
  SecureURL?: string;
  FileName?: string;
  PublicID?: string;
  Format?: string;
  Width?: number;
  Height?: number;
  Bytes?: number;
  CreatedAt?: Date;
  Etag?: string;
  Placeholder?: boolean;
  ResourceType?: string;
  Signature?: string;
  Tags?: Array<any>;
  Type?: string;
  Version?: number;

  constructor(documentobj?: any) {
    if (!documentobj) documentobj = {};
    this.URL = documentobj["url"] || "";
    this.SecureURL = documentobj["secure_url"] || "";
    this.FileName = documentobj["original_filename"] || "";
    this.PublicID = documentobj["public_id"] || "";
    this.Format = documentobj["format"] || "";
    this.Width = documentobj["width"] || "";
    this.Height = documentobj["height"] || "";
    this.Bytes = documentobj["bytes"] || "";
    this.CreatedAt = documentobj["created_at"] || "";
    this.Etag = documentobj["etag"] || "";
    this.Placeholder = documentobj["placeholder"] || "";
    this.ResourceType = documentobj["resource_type"] || "";
    this.Signature = documentobj["signature"] || "";
    this.Tags = documentobj["tags"] || "";
    this.Type = documentobj["type"] || "";
    this.Version = documentobj["version"] || "";
  }
}

export class TDocument {
  Type?: string;
  Document?: TCloudImage;
  constructor(documentobj?: any) {
    if (!documentobj) documentobj = {};
    this.Type = documentobj["type"] || "";
    this.Document = new TCloudImage(documentobj["document"]);
  }
}

export class TUser {
  Name?: string;
  AddressProof?: TDocument;
  CreationDate?: Date;
  Gender?: string;
  IDProof?: TDocument;
  Inactive?: boolean;
  Password?: string;
  Contact?: string;
  Email?: string;
  ID?: string;
  Role?: string;
  Photo?: TCloudImage;

  constructor(userobj?: any) {
    this.Name = userobj["accountHolderName"];
    this.AddressProof = new TDocument(userobj["addressProof"]);
    this.CreationDate = userobj["signUpDate"];
    this.Gender = userobj["gender"];
    this.IDProof = new TDocument(userobj["idProof"]);
    this.Inactive = userobj["isDeleted"];
    this.Password = userobj["password"];
    this.Contact = userobj["contact"];
    this.Email = userobj["email"];
    this.ID = userobj["_id"];
    this.Role = userobj["userType"];
    this.Photo = new TCloudImage(userobj["photo"]);
  }
}
