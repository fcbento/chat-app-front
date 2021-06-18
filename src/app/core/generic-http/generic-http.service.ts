import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GenericHttpService<T> {
    constructor(
        private httpClient: HttpClient,
        private url: string
    ) { }

    public create(item: T, endpoint: T): Observable<T> {
        console.log(item, endpoint)
        return this.httpClient
            .post<T>(`${this.url}/${endpoint}`, item)
            .pipe(map(data => data));
    }

    public update(item: T, id: any, endpoint: T): Observable<T> {
        return this.httpClient
            .put<T>(`${this.url}/${endpoint}/${id}`, item)
            .pipe(map(data => data));
    }

    public getById(id: string, endpoint: T): Observable<T> {
        return this.httpClient
            .get(`${this.url}/${endpoint}/${id}`)
            .pipe(map((data: any) => data));
    }

    public getByQuery(name: any, endpoint: T): Observable<T> {
        return this.httpClient
            .get(`${this.url}/${endpoint}/${name}`)
            .pipe(map((data: any) => data));
    }


    public getAll(endpoint: T): Observable<T[]> {
        return this.httpClient
            .get(`${this.url}/${endpoint}`)
            .pipe(map((data: any) => data));
    }

    public deleteById(id: number, endpoint: T) {
        return this.httpClient
            .delete(`${this.url}/${endpoint}/${id}`)
            .pipe(map(data => data));
    }

    public getAllWithUrlParam(url: any, endpoint: any, value: any): Observable<T[]> {
        if (value) {
            return this.httpClient
                .get(`${url}/${endpoint}/${value}`)
                .pipe(map((data: any) => data));
        } else {
            return this.httpClient
                .get(`${url}/${endpoint}`)
                .pipe(map((data: any) => data));
        }
    }
}