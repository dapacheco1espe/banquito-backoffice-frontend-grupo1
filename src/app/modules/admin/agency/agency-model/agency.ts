export class Agency {
    id!: number;
    locationId: String;
    code: String;
    name: String;
    uniqueKey: String;
    state: String;
    emailAddress: String;
    phoneNumber: String;
    line1: String;
    line2: String;
    creationDate: String;
    latitude: number;
    longitude: number;

    constructor(
        locationId: String,
        code: String,
        name: String,
        uniqueKey: String,
        state: String,
        emailAddress: String,
        phoneNumber: String,
        line1: String,
        line2: String,
        creationDate: String,
        latitude: number,
        longitude: number
    ) {
        this.locationId = locationId;
        this.code = code;
        this.name = name;
        this.uniqueKey = uniqueKey;
        this.state = state;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.line1 = line1;
        this.line2 = line2;
        this.creationDate = creationDate;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
