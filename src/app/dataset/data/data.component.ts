import { Component, Optional, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { AppState } from '../../app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './data.service';
import { DatasetService } from '../dataset.service';
import * as _ from 'lodash';

@Component({
  selector: 'data',
  styleUrls: [ './data.component.css' ],
  templateUrl: './data.component.html'
})
export class DataComponent {
    private datas: Array<any> = [];
    private _datas: Array<any> = [];

    private id: any;
    private sub: any;
    private sub2: any;

    @ViewChild('stage') stage: ElementRef;
    start: number = 0;
    zoomLevel : number = 3;
    dataSize: number = 0;
    list: boolean = true;
    selected: Set<number> = new Set<number>();
    selectedData: any;

    constructor(private _state: AppState,
                private route: ActivatedRoute,
                private router: Router,
                private _data: DataService,
                private _dataset: DatasetService){}

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this._dataset.getDataset(this.id).subscribe((v: any)=>{
                this.datas = v['data'];
            });
        });
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.update_size();
        });
    }

    zoom_in(){
        this.zoomLevel = _.max([1, this.zoomLevel-1]);
        this.update_size()
    }

    zoom_out(){
        this.zoomLevel = _.min([5, this.zoomLevel+1]);
        this.update_size()
    }

    update_size(){
        let w = this.stage.nativeElement.getBoundingClientRect().width;
        this.dataSize = (w / this.zoomLevel) - 6 // margin;
    }

    select(index: any, multi: boolean = false){
        if(multi){
            this.selected.add(index);
        } else {
            this.selected = new Set<number>();
            this.selected.add(index);
        }
        console.log(this.selected);
        this.selectedData = this.datas[index];
    }

    refresh(){
        this.selected = new Set<number>();
    }
}
