export class ClienteAddress{
    locationId: String;
    typeAddress: String;
    line1: String;
    line2: String;
    latitude: number;
    longitude: number;
    isDefault: Boolean;
    constructor(
        locationId: String,
        typeAddress: String,
        line1: String,
        line2: String,
        latitude: number,
        longitude: number,
        isDefault: true,

    ) {
      this.locationId = locationId;
      this.typeAddress = typeAddress;
      this.line1 = line1;
      this.line2 = line2;
      this.latitude = latitude;
      this.longitude = longitude;
      this.isDefault = isDefault;
    }
    // Constructor adicional con parámetros opcionales

}
