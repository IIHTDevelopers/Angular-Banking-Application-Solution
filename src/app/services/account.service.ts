import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private apiUrl = 'http://localhost:3000/accounts';

    constructor(private http: HttpClient) { }

    getAccount(): Observable<Account> {
        const url = `${this.apiUrl}/1`;
        return this.http.get<Account>(url);
    }

    addAccount(account: Account): Observable<Account> {
        return this.http.post<Account>(this.apiUrl, account);
    }

    updateAccount(account: Account): Observable<Account> {
        const url = `${this.apiUrl}/${account.id}`;
        return this.http.put<Account>(url, account);
    }

    deleteAccount(id: number): Observable<Account> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<Account>(url);
    }
}
