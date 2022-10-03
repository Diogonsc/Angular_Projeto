import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadFileRoutingModule } from './download-file-routing.module';
import { ProcessResultComponent } from './process-result/process-result.component';


@NgModule({
  declarations: [
    ProcessResultComponent
  ],
  imports: [
    CommonModule,
    DownloadFileRoutingModule
  ]
})
export class DownloadFileModule { }
