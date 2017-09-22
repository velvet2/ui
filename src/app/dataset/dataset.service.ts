import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class DatasetService {
    constructor(private _http: Http) { }

    getDataset(dataset_id: string): Observable<any> {
        return this._http.get('/api/datasets/' + dataset_id)
            .map((data: Response) => {
                return data.json()
            })
            .catch((data: Response) => {
                return data.json()
            });
    }

    listDataset(): Observable<any> {
        return this._http.get('api/datasets')
            .map((data: Response) => {
                return data.json()
            })
            .catch((data: Response) => {
                return data.json()
            });
    }

    create(name: string): Observable<any> {
        return this._http.post('api/datasets', { 'name': name })
           .map((v: any)=>{ return v })
           .catch((v: any)=>{ return v });
    }

    upload(id: string, form: FormData){
        return this._http.post(`api/datas/${id}`, form)
            .map((resp: any) => {return resp})
            .catch((resp: any) => {return resp});
    }

    delete(id: string){
        return this._http.delete('/api/datasets/' + id)
            .map((resp: any) => {return resp})
            .catch((resp: any) => {return resp});
    }
}
