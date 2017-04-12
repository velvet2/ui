import { Component, Optional, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { AppState } from '../../app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { DataService } from './data.service';
// import { LabelService } from '../label/label.service';
// import { Label } from '../label/label.class';
// import { LabelDialog } from '../dialog/label/label.dialog';
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

    // constructor(private _state: AppState,
    //             private route: ActivatedRoute,
    //             private router: Router,
    //             private dialog: MdDialog,
    //             private _data: DataService,
    //             private _label: LabelService) { }

    ngOnInit(){
        this.datas = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                        {},{},{},{},{},{},{},{},{},{},{},{},{},
                        {},{},{},{},{},{},{},{},{},{},{},{},{},
                        {},{},{},{},{},{},{},{},{},{},{},{},{},
                        {},{},{},{},{},{},{},{},{},{},{},{},{},];

        // this.datas = [{},{},{},{}];
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
        let w = this.stage.nativeElement.getBoundingClientRect().width;
        this.dataSize = (w / this.zoomLevel) - 6 // margin;
    }
 
    select(index: any, multi: boolean = false){
        if(multi){
            this.selected.add(index);
        } else {
            this.selected = new Set<number>();
            this.selected.add(index);
            this.selectedData = this.datas[index];
        }
    }

    refresh(){
        this.selected = new Set<number>();
    }

    // ngOnInit(){
    //     this.sub = this.route.params.subscribe(params => {
    //         this.id = +params['id'];
    //         this._data.getData(this.id).subscribe((v: any)=>{
    //             this.datas = v['data'];
    //             this.selected = this.datas[this.selected_index];
    //             this.reloadLabel();
    //         });
    //         this._label.get(this.id).subscribe((v:any)=>{
    //             this.labels = v['data'];
    //             if(this.labels.length != 0){
    //                 this.labelId = +this.labels[0].id;
    //             }
    //         },()=>{});
    //     });
    //
    //     this.sub2 = this._state.subscribe('label.refresh', ()=>{
    //         if(this.id){
    //             this._label.get(this.id).subscribe((v:any)=>{
    //                 this.labels = v['data'];
    //             },()=>{});
    //         }
    //     });
    // }
    //
    // next(){
    //     this.selected_index = Math.min(this.datas.length-1, this.selected_index+1);
    //     this.selected = this.datas[this.selected_index];
    //
    // }
    //
    // previous(){
    //     this.selected_index = Math.max(0, this.selected_index-1);
    //     this.selected = this.datas[this.selected_index];
    // }
    //
    // private reloadLabel(){
    //     this._data.getLabel(this.id).subscribe((label: any)=>{
    //         let lbl = label['data'];
    //         this.datas = _.map(this.datas, (item)=>{
    //             return _.extend(item, _.find(lbl, (v: any)=>{ return v.id == item.id }));
    //         });
    //     }, ()=>{})
    // }
    //
    // ngAfterViewInit(){
    //     this._updateHeight();
    // }
    //
    // @HostListener('document:keydown', ['$event'])
    // handleKeyboardEvent(event: KeyboardEvent) {
    //     switch(event.key){
    //         case 'ArrowDown':
    //             this.next();
    //             break;
    //         case 'ArrowUp':
    //             this.previous();
    //     }
    // }
    //
    // updateImageDimension(){
    //     let dimension = this.image.nativeElement.getBoundingClientRect();
    //     this.imageHeight = this.image.nativeElement.naturalHeight;
    //     this.imageWidth = this.image.nativeElement.naturalWidth;
    //     this.domHeight = dimension.height;
    //     this.domWidth = dimension.width;
    //     this.label.load(this.imageHeight, this.imageWidth, this.domHeight/this.imageHeight);
    // }
    //
    // @HostListener('window:resize', ['$event'])
    // private _updateHeight(){
    //     let dim = this.stage.nativeElement.getBoundingClientRect()
    //     this.height = window.innerHeight - dim.top;
    // }
    //
    // openLabelDialog() {
    //     let dialogRef = this.dialog.open(LabelDialog, {
    //         disableClose: false
    //     });
    //
    //     this._state.notifyDataChanged('label.data', {id:this.id});
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         dialogRef = null;
    //     });
    // }
    //
    // saveData(data: any){
    //     var id = this.selected.id;
    //     if(this.selected.id && this.labelId){
    //         this._data.saveData(data, this.selected.id, this.labelId)
    //         .subscribe((v: any)=>{
    //             _.extend(   _.find(this.datas, (v: any)=>{ return v.id == id }),
    //                         {label: JSON.stringify(data)});
    //         }, (e: any)=>{
    //             console.error(e)
    //         })
    //     }
    // }
    //
    updateIndex(e: any){
        this.start = e.start;
    }
    //
    // ngOnDestroy(){
    //     this.sub.unsubscribe();
    //     this.sub2.unsubscribe();
    // }
}
