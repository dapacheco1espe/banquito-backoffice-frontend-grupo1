export interface AccountRQ{
    codeInternalAccount : string,
    name:string,
    totalBalance: number,
    availableBalance :number,
    blockedBalance :number,
    lastInterestCalculationDate :string,
    allowOverdraft : boolean,
    maxOverdraft :number,
    accountHolderCode:string,
    accountHolderType :string,
    codeInternationalAccount:string,
    state:string,
    interestRate:number,
    clientUk:string,
    groupUk:string,
    productUk:string
}