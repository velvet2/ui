import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @ViewChild('main') main: ElementRef;
    tableHeight: number = 0;

    rows = [
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},
        {name: "A", "gender": "male", "company": "AAA"},

    ];

    loadingIndicator: boolean = true;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  routeListener: any;
  dialogRef: any;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private dialog: MdDialog ) {}

  ngOnInit() {
      this.route.fragment.subscribe((v: any)=>{
          if (v == 'new'){
            this.dialogRef = this.dialog.open(AddComponent);
            this.dialogRef.afterClosed().subscribe(( result: any ) => {
              this.router.navigate([])
            });
          }
      });
  }

  ngOnDestroy(){
      this.routeListener.unsubscribe();
  }

}
