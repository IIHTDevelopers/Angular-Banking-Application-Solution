export class Beneficiary {
    id: number;
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;

    constructor(id: number | 0,
        accountHolderName: string,
        accountNumber: string,
        bankName: string,
        ifscCode: string) {
        this.id = id;
        this.accountHolderName = accountHolderName;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.ifscCode = ifscCode;
    }
}
