import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class DataBus {
    selected: Set<number> = new Set<number>();;
    datas: Array<any> = [];

    // Observable string sources
    private data = new Subject<string>();

    // Observable string streams
    data$ = this.data.asObservable();

    updateLabelConfig(data: any, config: any){
        data.label.config = config;
    }

    findLabel(id: Set<number>, callback: Function){
        _(this.datas).filter((data: any)=>{
            return id.has(data.data.id);
        }).each(callback);
    }

    setData(datas: Array<any>){
        this.datas = datas;
    }

    setSelected(sel: Set<number>){
        this.selected = sel;
    }
}
