import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should display My Virtual Bank heading', () => {
            const headingElement = fixture.nativeElement.querySelector('div');
            expect(headingElement.textContent).toContain('My Virtual Bank');
        });

        it('should have anchor tag for Account Details', () => {
            const accountDetailsAnchor = fixture.debugElement.nativeElement.querySelector('a[href="/account-details"]');
            expect(accountDetailsAnchor).toBeTruthy();
            expect(accountDetailsAnchor.textContent).toContain('Account Details');
        });

        it('should have anchor tag for Beneficiary Management', () => {
            const beneficiaryAnchor = fixture.debugElement.nativeElement.querySelector('a[href="/beneficiary-management"]');
            expect(beneficiaryAnchor).toBeTruthy();
            expect(beneficiaryAnchor.textContent).toContain('Beneficiary Management');
        });

        it('should have anchor tag for Transactions', () => {
            const transactionsAnchor = fixture.debugElement.nativeElement.querySelector('a[href="/transactions"]');
            expect(transactionsAnchor).toBeTruthy();
            expect(transactionsAnchor.textContent).toContain('Transactions');
        });

        it('should have router link for Account Details', () => {
            const accountDetailsRouterLink = fixture.debugElement.query(By.css('a[href="/account-details"]'));
            expect(accountDetailsRouterLink).toBeTruthy();
            expect(accountDetailsRouterLink.attributes['routerLink']).toBe('/account-details');
        });

        it('should have router link for Beneficiary Management', () => {
            const beneficiaryRouterLink = fixture.debugElement.query(By.css('a[href="/beneficiary-management"]'));
            expect(beneficiaryRouterLink).toBeTruthy();
            expect(beneficiaryRouterLink.attributes['routerLink']).toBe('/beneficiary-management');
        });

        it('should have router link for Transactions', () => {
            const transactionsRouterLink = fixture.debugElement.query(By.css('a[href="/transactions"]'));
            expect(transactionsRouterLink).toBeTruthy();
            expect(transactionsRouterLink.attributes['routerLink']).toBe('/transactions');
        });
    });
});
