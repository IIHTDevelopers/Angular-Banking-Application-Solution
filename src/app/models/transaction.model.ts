export class Transaction {
    id: number;
    beneficiaryId: number;
    transactionAmount: number;
    transactionDate: Date;

    constructor(id: number | 0,
        beneficiaryId: number,
        transactionAmount: number,
        transactionDate: Date) {
        this.id = id;
        this.beneficiaryId = beneficiaryId;
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
    }
}
