import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    //   console.log(this.main.nativeElement.getBoundingClientRect().height);
      this.tableHeight = this.main.nativeElement.getBoundingClientRect().height;
      console.log(this.main.nativeElement.getBoundingClientRect())
  }

  ngAfterViewInit(){
      this.tableHeight = this.main.nativeElement.getBoundingClientRect().height;
      console.log(this.main.nativeElement.getBoundingClientRect())
      
  }

}
