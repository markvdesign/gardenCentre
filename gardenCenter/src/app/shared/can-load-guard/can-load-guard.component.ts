import { Component, OnInit } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

@Component({
  selector: 'gc-can-load-guard',
  templateUrl: './can-load-guard.component.html',
  styleUrls: ['./can-load-guard.component.scss']
})
export class CanLoadGuardComponent implements OnInit, CanLoad {

  constructor() { }

  ngOnInit() {
  }
  
  canLoad() {
    return true;
  }

}
