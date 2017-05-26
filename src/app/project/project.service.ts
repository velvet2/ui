import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {
    constructor(private _http: Http) { }

    getProject(): Observable<any> {
        return this._http.get('api/project')
            .map((data: Response) => {
                return data.json();
            })
            .catch((data: Response) => {
                return data.json();
            });
    }

    create(name: string, label: string, dataset: number): Observable<any> {
        return this._http.post("api/project", { "name": name, "label": label, "dataset_id": dataset })
           .map((v: any)=>{ return v })
           .catch((v: any)=>{ return v });
    }

    delete(dataset: number): Observable<any> {
        return this._http.delete('api/project/' + String(dataset))
            .map((data: Response) => {
                return null;
            })
            .catch((data: Response) => {
                return null;
            });
    }

    edit(id: number, name: string, config: any): Observable<any> {
        return this._http.put('api/project/' + String(id),
                {name: name, config: config})
            .map((data: Response) => {
                return null;
            })
            .catch((data: Response) => {
                return null;
            });
    }

    getOneProject(id: string): Observable<any> {
        return this._http.get('api/project/' + id)
            .map((data: Response) => {
                return data.json();
            })
            .catch((data: Response) => {
                return data.json()
            });
    }

    updateLabel(project_id: any, data_id: Array<any>, label: any, inference: any){
      return this._http.post('api/project/data/' + String(project_id),
            { data: data_id, label: label, inference: inference})
            .map((data: Response) =>{
              return null;
            })
            .catch((data: Response) =>{
              return null
            });
    }

}
