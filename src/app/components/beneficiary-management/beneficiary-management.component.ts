import { Component, OnInit } from '@angular/core';
import { Beneficiary } from '../../models/beneficiary.model';
import { BeneficiaryService } from '../../services/beneficiary.service';

@Component({
  selector: 'app-beneficiary-management',
  templateUrl: './beneficiary-management.component.html',
  styleUrls: ['./beneficiary-management.component.css']
})
export class BeneficiaryManagementComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  selectedBeneficiary: Beneficiary | null = null;
  isAddMode: boolean = false;

  constructor(private beneficiaryService: BeneficiaryService) { }

  ngOnInit(): void {
    this.loadBeneficiaries();
  }

  loadBeneficiaries(): void {
    this.beneficiaryService.getBeneficiaries().subscribe((data: Beneficiary[]) => {
      this.beneficiaries = data;
    });
  }

  openAddMode(): void {
    this.selectedBeneficiary = {
      id: 0,
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: ''
    };
    this.isAddMode = true;
  }

  openEditMode(beneficiary: Beneficiary): void {
    this.selectedBeneficiary = { ...beneficiary };
    this.isAddMode = false;
  }

  saveBeneficiary(): void {
    if (this.isAddMode) {
      this.beneficiaryService.addBeneficiary(this.selectedBeneficiary!).subscribe(() => {
        this.loadBeneficiaries();
        this.cancelEdit();
      });
    } else {
      this.beneficiaryService.updateBeneficiary(this.selectedBeneficiary!).subscribe(() => {
        this.loadBeneficiaries();
        this.cancelEdit();
      });
    }
  }

  deleteBeneficiary(id: number): void {
    this.beneficiaryService.deleteBeneficiary(id).subscribe(() => {
      this.loadBeneficiaries();
    });
  }

  cancelEdit(): void {
    this.selectedBeneficiary = null;
    this.isAddMode = false;
  }
}
