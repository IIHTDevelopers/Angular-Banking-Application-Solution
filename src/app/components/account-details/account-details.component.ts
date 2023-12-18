import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: Account | null = null;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.loadAccountDetails();
  }

  loadAccountDetails(): void {
    this.accountService.getAccount().subscribe((data: Account) => {
      this.account = data;
    });
  }

  goToTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  goToBeneficiaries(): void {
    this.router.navigate(['/beneficiary-management']);
  }
}
