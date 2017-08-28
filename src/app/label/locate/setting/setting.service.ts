import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { find } from 'lodash';

@Injectable()
export class LocateSettingService {
  projectID: string;
  class: Array<any> = [];
  width: number = 10;
  height: number = 10;

  getClass(cls : string = undefined){
    if (cls == undefined){
      if ( this.class.length == 0){
        return undefined;
      } else {
        return this.class[0]
      }
    } else {
      return find(this.class, (v) => v.class == cls);
    }
  }
}
