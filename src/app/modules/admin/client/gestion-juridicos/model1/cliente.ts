export class Cliente {
    uniqueKey!: string;
    branchId: string;
    locationId: string;
    groupName: string;
    emailAddress: string;
    phoneNumber: string;
    line1: string;
    line2: string;
    latitude: number;
    longitude: number;
    creationDate: Date;
    activationDate: Date;
    lastModifiedDate: Date;
    state: string;
    closedDate: Date;
    comments: string;
    members: null;
  
    constructor(
      branchId: string,
      locationId: string,
      uniqueKey: string,
      groupName: string,
      emailAddress: string,
      phoneNumber: string,
      line1: string,
      line2: string,
      latitude: number,
      longitude: number,
      creationDate: Date,
      activationDate: Date,
      lastModifiedDate: Date,
      state: string,
      closedDate: null | Date,
      comments: string,
      members: null
    ) {
      this.branchId = branchId;
      this.locationId = locationId;
      this.uniqueKey = uniqueKey;
      this.groupName = groupName;
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.line1 = line1;
      this.line2 = line2;
      this.latitude = latitude;
      this.longitude = longitude;
      this.creationDate = creationDate;
      this.activationDate = activationDate;
      this.lastModifiedDate = lastModifiedDate;
      this.state = state;
      this.closedDate = closedDate;
      this.comments = comments;
      this.members = members;
    }
  }
  