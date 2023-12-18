import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { TransactionService } from '../../services/transaction.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  beneficiaries: any[] = [];
  selectedBeneficiary: any;
  amount: number = 0;
  transactionForm: FormGroup;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder
  ) {
    this.transactionForm = this.formBuilder.group({
      beneficiaryId: ['', Validators.required],
      transactionAmount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadBeneficiaries();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

  loadBeneficiaries(): void {
    this.beneficiaryService.getBeneficiaries().subscribe((data: any[]) => {
      this.beneficiaries = data;
    });
  }

  createTransaction(beneficiaryId: number, amount: number): void {
    const transaction = new Transaction(0, beneficiaryId, amount, new Date());
    this.transactionService.addTransaction(transaction).subscribe(() => {
      this.loadTransactions();
    });
  }

  transferMoney(): void {
    if (this.amount && this.selectedBeneficiary) {
      this.createTransaction(this.selectedBeneficiary.id, this.amount);
      this.selectedBeneficiary = null;
      this.amount = 0;
    }
  }
}
