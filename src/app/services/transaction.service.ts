import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private apiUrl = 'http://localhost:3000/transactions';

    constructor(private http: HttpClient) { }

    getTransactions(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(this.apiUrl);
    }

    getTransactionById(id: number): Observable<Transaction> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Transaction>(url);
    }

    addTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(this.apiUrl, transaction);
    }

    updateTransaction(transaction: Transaction): Observable<Transaction> {
        const url = `${this.apiUrl}/${transaction.id}`;
        return this.http.put<Transaction>(url, transaction);
    }

    deleteTransaction(id: number): Observable<Transaction> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<Transaction>(url);
    }
}
