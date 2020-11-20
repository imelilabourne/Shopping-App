import { NgModule, Directive,OnInit, EventEmitter, Output, OnDestroy, Input,ElementRef,Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../pipes/sort.pipe';
import { FilterPipe } from '../pipes/filter.pipe';


@NgModule({
  imports: [
  ],
  declarations: [
    SortPipe,
    FilterPipe
  ],
  exports: [
    SortPipe,
    FilterPipe
  ]
})

export class SharedModule { }