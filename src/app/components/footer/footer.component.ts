import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <span class="created-by">Created by <b><a href="http://viaflow.com.br" target="_blank">ViaFlow Consultoria</a></b> 2019</span>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
