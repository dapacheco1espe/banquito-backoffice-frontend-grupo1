export class Holiday {
    uuid: string;
    holidayDate: Date;
    countryCode: string;
    name: string;
    type: string;
    constructor(
        uuid: string,
        holidayDate: Date,
        countryCode: string,
        name: string,
        type: string
    ) {
        this.uuid = uuid;
        this.holidayDate = holidayDate;
        this.countryCode = countryCode;
        this.name = name;
        this.type = type;
    }
}
