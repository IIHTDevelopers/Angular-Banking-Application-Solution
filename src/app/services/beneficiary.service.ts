import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models/beneficiary.model';

@Injectable({
    providedIn: 'root'
})
export class BeneficiaryService {
    private apiUrl = 'http://localhost:3000/beneficiaries';

    constructor(private http: HttpClient) { }

    getBeneficiaries(): Observable<Beneficiary[]> {
        return this.http.get<Beneficiary[]>(this.apiUrl);
    }

    getBeneficiaryById(id: number): Observable<Beneficiary> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Beneficiary>(url);
    }

    addBeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {
        return this.http.post<Beneficiary>(this.apiUrl, beneficiary);
    }

    updateBeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {
        const url = `${this.apiUrl}/${beneficiary.id}`;
        return this.http.put<Beneficiary>(url, beneficiary);
    }

    deleteBeneficiary(id: number): Observable<Beneficiary> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<Beneficiary>(url);
    }
}
