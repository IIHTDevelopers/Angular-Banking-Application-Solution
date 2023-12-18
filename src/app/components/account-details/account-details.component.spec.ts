import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountDetailsComponent } from './account-details.component';
import { AccountService } from '../../services/account.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;
  let accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDetailsComponent],
      providers: [AccountService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display "Account Details" heading', () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector('h2');
      expect(heading.textContent).toContain('Account Details');
    });
  });
});
