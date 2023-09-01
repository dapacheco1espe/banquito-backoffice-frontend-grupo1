export interface Product {
    uniqueId: string;
    productAccountType: ProductAccountType;
    name: string;
    temporalityAccountStatement: string;
    useCheckbook: boolean;
    allowOverdraft: boolean;
    allowTransferences: boolean;
    maxOverdraft: number;
    clientType: string;
    minOpeningBalance: number;
    minInterest: number;
    maxInterest: number;
    state: string;
    creationDate: string;
    activationDate: string;
    lastModifiedDate: string;
    closedDate: string;
    valid: boolean;
    version: number;
}
interface ProductAccountType {
    name: string;
    clientType: string;
    superType: any;
    temporalityInterest: string;
    allowEarnInterest: boolean;
    allowAccountStatement: boolean;
    allowBranchTransactions: boolean;
    allowWithdrawal: boolean;
    version: number,
}
