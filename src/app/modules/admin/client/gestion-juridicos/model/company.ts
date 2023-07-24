export class Company {
    uniqueKey: String;
    branchId: String;
    locationId: String;
    groupName: String;
    emailAddress: String;
    phoneNumber: String;
    line1: String;
    line2: String;
    latitude: number;
    longitude: number;
    state: String;
    comments: String;
    creationDate: String;
    lastModifiedDate: String;

  
    constructor(
      uniqueKey : String,
      branchId: String,
      locationId: String,
      groupName: String,
      emailAddress: String,
      phoneNumber: String,
      line1: String,
      line2: String,
      latitude: number,
      longitude: number,
      state: String,
      comments: String,
      creationDate: String,
      lastModifiedDate: String,
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
      this.state = state;
      this.comments = comments;
      this.creationDate = creationDate;
      this.lastModifiedDate = lastModifiedDate;

    }
  }
  