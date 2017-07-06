import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
    <p style="text-align:right;vertical-align:middle"><p>
  `,
})
export class ClientDetailRender extends DefaultEditor implements AfterViewInit  {

  renderValue: string;

  // @ViewChild('name') name: ElementRef;
  // @Input() value: string | number;
  // @Input() rowData: any;

  constructor() {
    super();
  }

  ngAfterViewInit() {

  	// if(this.value==""|| this.value==" " || this.value==null){
  	// 	//this.value="Empty";
  	// }
  }

}