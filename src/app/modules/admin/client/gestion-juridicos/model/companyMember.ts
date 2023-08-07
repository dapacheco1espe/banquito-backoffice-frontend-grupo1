export class CompanyMember{
    groupRole: String;
    clientId: String;
    state: String;

    constructor(
        groupRole: String,
        clientId: String,
        state: String,

    ) {
      this.groupRole = groupRole;
      this.clientId = clientId;
      this.state = state;
    }
    // Constructor adicional con parámetros opcionales
}
