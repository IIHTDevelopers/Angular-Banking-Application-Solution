import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionComponent } from './transaction.component';
import { TransactionService } from '../../services/transaction.service';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let transactionService: TransactionService;
  let beneficiaryService: BeneficiaryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            getTransactions: jest.fn(),
            addTransaction: jest.fn()
          }
        },
        {
          provide: BeneficiaryService,
          useValue: {
            getBeneficiaries: () => of([])
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    beneficiaryService = TestBed.inject(BeneficiaryService);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display Transaction List heading', () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector('h2');
      expect(heading.textContent).toContain('Transaction List');
    });

    it('should display Transfer Money heading', () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelectorAll('h2')[1];
      expect(heading.textContent).toContain('Transfer Money');
    });

    it('should display the transfer form elements', () => {
      const compiled = fixture.nativeElement;
      const formLabels = compiled.querySelectorAll('label');
      const formInputs = compiled.querySelectorAll('input');
      const formSelect = compiled.querySelector('select');
      const formButton = compiled.querySelector('button');

      expect(formLabels.length).toBe(2);
      expect(formInputs.length).toBe(1);
      expect(formSelect).toBeTruthy();
      expect(formButton.textContent).toContain('Transfer');
    });

    it('should display transaction details', () => {
      const mockTransactions = [
        {
          id: 1,
          beneficiaryId: 101,
          transactionAmount: 100,
          transactionDate: new Date('2023-11-08T14:48:00')
        },
        {
          id: 2,
          beneficiaryId: 102,
          transactionAmount: 200,
          transactionDate: new Date('2023-11-09T10:30:00')
        }
      ];
      jest.spyOn(transactionService, 'getTransactions').mockReturnValue(of(mockTransactions));
      component.loadTransactions();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const transactionElements = compiled.querySelectorAll('li');
      expect(transactionElements.length).toBe(mockTransactions.length);
      transactionElements.forEach((itemElement: any, index: number) => {
        const transaction = mockTransactions[index];
        expect(itemElement.textContent).toContain(`Beneficiary: ${transaction.beneficiaryId}`);
        expect(itemElement.textContent).toContain(`Amount: ${transaction.transactionAmount}`);
      });
    });
  });
});
