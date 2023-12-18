import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BeneficiaryManagementComponent } from './beneficiary-management.component';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { of } from 'rxjs';
import { Beneficiary } from 'src/app/models/beneficiary.model';

describe('BeneficiaryManagementComponent', () => {
  let component: BeneficiaryManagementComponent;
  let fixture: ComponentFixture<BeneficiaryManagementComponent>;
  let beneficiaryService: BeneficiaryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiaryManagementComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: BeneficiaryService,
          useValue: {
            getBeneficiaries: () => of([]),
            addBeneficiary: jest.fn(),
            updateBeneficiary: jest.fn(),
            deleteBeneficiary: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiaryManagementComponent);
    component = fixture.componentInstance;
    beneficiaryService = TestBed.inject(BeneficiaryService);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have Add Beneficiary button', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('button');
      expect(addButton.textContent).toContain('Add Beneficiary');
    });

    it('should display beneficiary details properly', () => {
      const mockBeneficiaries = [
        {
          id: 1,
          accountHolderName: 'John Doe',
          accountNumber: '1234567890',
          bankName: 'ABC Bank',
          ifscCode: 'ABCD1234'
        },
        {
          id: 2,
          accountHolderName: 'Jane Doe',
          accountNumber: '0987654321',
          bankName: 'XYZ Bank',
          ifscCode: 'XYZ9876'
        }
      ];

      jest.spyOn(beneficiaryService, 'getBeneficiaries').mockReturnValue(of(mockBeneficiaries));

      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const beneficiaryElements = compiled.querySelectorAll('li');

      expect(beneficiaryElements.length).toEqual(mockBeneficiaries.length);

      beneficiaryElements.forEach((element: HTMLElement, index: number) => {
        const beneficiary = mockBeneficiaries[index];
        expect(element.textContent).toContain(beneficiary.accountHolderName);
      });
    });

    it('should display form validations properly', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('button');
      addButton.click();
      fixture.detectChanges();
      const saveButton = compiled.querySelector('button[type="submit"]');
      fixture.detectChanges();
      const errorMessages = compiled.querySelectorAll('div.error-message');
      expect(errorMessages.length).toBe(0);
    });
  });
});
