import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <p style="text-align:right;vertical-align:middle">{{this.renderValue}}<p>
  `,
})
export class MaterialRender implements ViewCell, OnInit  {

  renderValue: string;

  // @ViewChild('name') name: ElementRef;
  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
  	if(this.value==""|| this.value==" " || this.value==null){
  		this.renderValue="Empty";
  	}else{
      this.renderValue=this.value;
    }
  }

}