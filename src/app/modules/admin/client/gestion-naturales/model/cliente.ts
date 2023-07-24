
export class Cliente {
    uniqueKey!: String;
    branchId: String;
    typeDocumentId: String;
    documentId: String;
    firstName: String;
    lastName: String;
    gender: String;
    birthDate: String;
    emailAddress: String;
    creationDate: String;
    activationDate: String;
    lastModifiedDate: String;
    role: String;
    state: String;
    closedDate: String;
    comments: String;
    phoneNumbers:clientePhone;
    addresses : clienteAddress;


    constructor(
      branchId: String,
      typeDocumentId: String,
      documentId: String,
      firstName: String,
      lastName: String,
      gender: String,
      birthDate: String,
      emailAddress: String,
      role: String,
      comments: String,
      phoneNumbers:clientePhone , 
      addresses : clienteAddress   
    ) {
      this.branchId = branchId;
      this.typeDocumentId = typeDocumentId;
      this.documentId = documentId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.birthDate = birthDate;
      this.emailAddress = emailAddress;
      this.role = role;
      this.comments = comments;
      this.phoneNumbers = phoneNumbers;
      this.addresses = addresses;
      
    }
    // Constructor adicional con parámetros opcionales

}
export class clientePhone{
  phoneType: String;
  phoneNumber: String;
  isDefault: boolean;}

  export class clienteAddress{
    locationId: String;
    typeAddress: String;
    line1: String;
    line2: String;
    latitude: number;
    longitude: number;
    isDefault: Boolean;}
