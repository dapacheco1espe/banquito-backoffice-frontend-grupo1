import { Member } from "./Member";

export interface Company{
    branchId        :   string,
    locationId      :   string,
    uniqueKey       :   string,
    groupName       :   string,
    emailAddress    :   string,
    phoneNumber     :   string,
    line1           :   string,
    line2           :   string,
    latitude        :   number,
    longitude       :   number,
    creationDate    :   string,
    activationDate  :   string,
    lastModifiedDate:   string,
    state           :   string,
    closedDate      :   string | null,
    comments        :   string,
    members         :   Array<Member>,
}