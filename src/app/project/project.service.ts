import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {
    constructor(private _http: Http) { }

    getProject(): Observable<any> {
        return this._http.get('api/project')
            .map((data: Response) => {
                return data.json()
            })
            .catch((data: Response) => {
                return data.json()
            });
    }

    create(name: string, label: string, dataset: number): Observable<any> {
        return this._http.post("api/project", { "name": name, "label": label, "dataset": dataset })
           .map((v: any)=>{ return v })
           .catch((v: any)=>{ return v });
    }

    getOneProject(id: string): Observable<any> {
        return this._http.get('api/project/' + id)
            .map((data: Response) => {
                return data.json()
            })
            .catch((data: Response) => {
                return data.json()
            });
    }

}
