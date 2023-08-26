export class Geolocation{
    uuid: string;
    countryCode: string;
    levelCode: string;
    levelName: string;
    name: string;
    areaPhoneCode: string;
    constructor(uuid: string, countryCode: string, levelCode: string, levelName: string, name: string, areaPhoneCode: string){
        this.uuid = uuid;
        this.countryCode = countryCode;
        this.levelCode = levelCode;
        this.levelName = levelName;
        this.name = name;
        this.areaPhoneCode = areaPhoneCode;
    }
}