import { Component, Optional, ViewChild, HostListener } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { AppState } from '../../app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../dataset/data';
import { ProjectService } from '../project.service';
import { LabelBus } from '../../label/label.service';
import { DataBus } from './data.service';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';
import * as jsep from 'jsep'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';

@Component({
  selector: 'data',
  styleUrls: [ './data.component.css' ],
  templateUrl: './data.component.html'
})
export class DataComponent {
    @ViewChild('vs') vs : VirtualScrollComponent;

    private datas: Array<any> = [];
    private _datas: Array<any> = [];

    private id: any;
    private sub: any;
    private sub2: any;

    start: number = 0;
    zoomLevel : number = 3;
    dataSize: number = 0;
    list: boolean = true;
    selected: Set<number> = new Set<number>();
    selectedData: any;
    setting: boolean = false;
    full: boolean = false;
    search: string = '';
    search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    project: any;

    constructor(private _state: AppState,
                private route: ActivatedRoute,
                private router: Router,
                private _data: DataService,
                private _project: ProjectService,
                private _label: LabelBus,
                private _datab: DataBus){}
                // private dialog: MdDialog,
                // private _label: LabelBus) { }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this._project.getOneProject(this.id).subscribe((v: any)=>{
                this.project = v;
                this.datas =  this.project.datas
                this._datab.datas = this.datas;
            });
        });

        this.sub = this._state.subscribe('project.render', ()=>{
          this.vs.refresh();
        })

        this.sub2 = this.search$.debounceTime(500).subscribe((v: any)=>{
          try{
            jsep(v)
          } catch (e) {
            console.log("error")
          } finally {
            this.doSearch(v)
          }
        });
    }

    doSearch(query: any){
      this._project.getOneProject(this.id, query).subscribe((v: any)=>{
          this.project = v;
          this.datas =  this.project.datas
          this._datab.datas = this.datas;
      });
    }

    ngAfterViewInit(){
        this.update_size();
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
        this.dataSize = (window.innerWidth / this.zoomLevel) - 6 // margin;
    }

    select(index: any, multi: boolean = false){
        if(multi){
            this.selected.add(index);
        } else {
            this.selected = new Set<number>();
            this.selected.add(index);
            this.selectedData = this.datas[index];
        }

        this._datab.setSelected(this.selected);
    }

    toggleSetting(){
      this.setting = !this.setting;
    }

    toggleFull(){
        this.full = !this.full;
    }

    refresh(){
        this.selected = new Set<number>();
    }

    updateConfig(e: any){
      this._project.edit(this.id, undefined, e).subscribe((v: any)=>{
        console.log("config updated")
      })
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(ev: any) {
      if (ev.srcElement != document.body){
        return;
      }

      if ((ev.key ==  "a" || ev.key == 'A') && ev.ctrlKey ){
        ev.preventDefault();
        this.selected = new Set<number>(_.map(this.datas, (v)=> v.id))
      }
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }
}
