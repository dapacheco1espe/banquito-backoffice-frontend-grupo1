export class Geostructure {
    countryId: string;
    phoneCode: string;
    name: string;
    geostructure: GeostructureLevel[];

    constructor(
        countryId: string,
        phoneCode: string,
        name: string,
        geostructure: GeostructureLevel[]
    ) {
        this.countryId = countryId;
        this.phoneCode = phoneCode;
        this.name = name;
        this.geostructure = geostructure;
    }
}

export class GeostructureLevel {
    level_code: number;
    name: string;
}
