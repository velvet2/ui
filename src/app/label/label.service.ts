import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class LabelBus {
    constructor(private _http: Http) {
      console.log("initiaed")
    }
}
