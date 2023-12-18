import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { BeneficiaryManagementComponent } from './components/beneficiary-management/beneficiary-management.component';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/account-details', pathMatch: 'full' },
  { path: 'account-details', component: AccountDetailsComponent },
  { path: 'beneficiary-management', component: BeneficiaryManagementComponent },
  { path: 'transactions', component: TransactionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
