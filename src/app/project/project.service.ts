import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {
    constructor(private _http: Http) { }

    list(): Observable<any> {
        return this._http.get('api/projects/')
            .map((data: Response) => {
                return data.json().data;
            })
            .catch((data: Response) => {
                return data.json();
            });
    }

    get(id: string, filter?: string): Observable<any> {
        return this._http.get(`api/projects/${id}/`)
            .map((data: Response) => {
                return data.json().data;
            })
            .catch((data: Response) => {
                return data.json();
            });
    }


    create(name: string, label: string, dataset: number): Observable<any> {
        return this._http.post("api/projects/", { "name": name, "label": label, "dataset": dataset })
           .map((v: any)=>{ return v })
           .catch((v: any)=>{ return v });
    }

    delete(id: number): Observable<any> {
        return this._http.delete(`api/projects/${id}`)
            .map((data: Response) => {
                return null;
            })
            .catch((data: Response) => {
                return null;
            });
    }

    edit(id: number, name: string, config: any): Observable<any> {
        return this._http.put(`api/projects/${id}/`,
                {name: name, config: config})
            .map((data: Response) => {
                return data;
            })
            .catch((data: Response) => {
                return null;
            });
    }

    filter(id: string, filter?: string): Observable<any> {
        let params: any = {}
        params.project = id;
        if( filter ){
            params.search = btoa(filter);
            params.encode = 1;
         }

        return this._http.get('api/datas/labels/', {
            params: params
        }).map((data: Response) => {
            return data.json();
        }).catch((data: Response) => {
            return data.json()
        });
    }

    labels(project_id: any, data_id: Array<any>, label: any){
      return this._http.post('api/labels/',
            { project: project_id, dat: data_id, config: label })
            .map((data: Response) =>{
              return null;
            })
            .catch((data: Response) =>{
              return null
            });
    }

}
