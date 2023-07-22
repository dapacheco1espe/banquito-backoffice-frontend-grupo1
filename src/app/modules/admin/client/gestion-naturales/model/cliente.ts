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
      comments: String
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
    }
    // Constructor adicional con parámetros opcionales

}