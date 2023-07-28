export class Geostructure {
    countryCode: string;
    phoneCode: string;
    name: string;
    geoStructures: GeostructureLevel[];

    constructor(
        countryCode: string,
        phoneCode: string,
        name: string,
        geoStructures: GeostructureLevel[]
    ) {
        this.countryCode = countryCode;
        this.phoneCode = phoneCode;
        this.name = name;
        this.geoStructures = geoStructures;
    }
}

export class GeostructureLevel {
    levelCode: number;
    name: string;
}
