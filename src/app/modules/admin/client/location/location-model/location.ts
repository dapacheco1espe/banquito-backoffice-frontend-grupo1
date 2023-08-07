export class Location {
    uuid: string;
    countryCode: string;
    levelParentId: string;
    levelParentName: string;
    levelCode: string;
    levelName: string;
    name: string;
    areaPhoneCode: string;
    constructor(
        uuid: string,
        countryCode: string,
        levelParentId: string,
        levelParentName,
        levelCode: string,
        levelName: string,
        name: string,
        areaPhoneCode: string
    ) {
        this.uuid = uuid;
        this.countryCode = countryCode;
        this.levelParentId = levelParentId;
        this.levelParentName = levelParentName;
        this.levelCode = levelCode;
        this.levelName = levelName;
        this.name = name;
        this.areaPhoneCode = areaPhoneCode;
    }
}
