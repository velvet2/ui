import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class DatasetService {
    constructor(private _http: Http) { }

    getDataset(): Observable<any> {
        return this._http.get('api/dataset')
            .map((data: Response) => {
                return data.json()
            })
            .catch((data: Response) => {
                return data.json()
            });
    }

    create(name: string): Observable<any> {
        return this._http.post("api/dataset", { "name": name })
           .map((v: any)=>{ return v })
           .catch((v: any)=>{ return v });
    }

    upload(id: string, form: FormData){
        form.append('id', id)
        return this._http.post('api/dataset/upload', form)
            .map((resp: any) => {return resp})
            .catch((resp: any) => {return resp});
    }

    delete(id: string){
        return this._http.delete('/api/dataset/' + id)
            .map((resp: any) => {return resp})
            .catch((resp: any) => {return resp});
    }
}
