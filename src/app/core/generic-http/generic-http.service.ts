import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GenericHttpService<T> {
    constructor(
        private httpClient: HttpClient,
        private url: string,
        private endpoint: string
    ) { }

    public create(item: T): Observable<T> {
        return this.httpClient
            .post<T>(`${this.url}/${this.endpoint}`, item)
            .pipe(map(data => data));
    }

    public update(item: T): Observable<T> {
        return this.httpClient
            .put<T>(`${this.url}/${this.endpoint}/${item.id}`, item)
            .pipe(map(data => data));
    }

    public getById(id: number): Observable<T> {
        return this.httpClient
            .pipe(map(data => data));
    }

    public getAll(): Observable<T[]> {
        return this.httpClient
            .get(`${this.url}/${this.endpoint}`)
            .pipe(map(data => data));
    }

    public deleteById(id: number) {
        return this.httpClient
            .delete(`${this.url}/${this.endpoint}/${id}`)
            .pipe(map(data => data));
    }
}