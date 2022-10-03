import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsResultService } from '../charts/chartsResultService.service';
import { AdministrativesService } from './administratives.service';
import * as fileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { ProcessResultService } from 'src/app/components/download-file/process-result/processResultService.service';

@Component({
  selector: 'app-administratives',
  templateUrl: './administratives.component.html',
  styleUrls: ['./administratives.component.scss']
})
export class AdministrativesComponent implements OnInit {

  files: Set<File> | undefined;
  selectedFiles: FileList | [] = [];
  setFile: Array<string> = [];
  selectedFilesStr: string = '';
  selectedFilesStrReport: string = '';

  setFileListUp: Array<File> = [];
  newSetFileListUp: Array<any> = [];

  setFileListAt: Array<File> = [];
  newSetFileListAt: Array<any> = [];

  setFileListNcm: Array<File> = [];
  newSetFileListNcm: Array<any> = [];

  uploadReport = false;

  progress = 0;

  constructor(
    @Inject(ChartsResultService) private service: ChartsResultService,
    private downloadService: ProcessResultService,
    private uploadService: AdministrativesService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  alertUploadCompleted() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Upload Concluido com Sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    this.clearInputFiles()
  }
  alertUploadAtCompleted() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Upload Atualizado com Sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    this.clearInputFiles()
  }
  alertUploadNcmCompleted() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Upload NCM com Sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    this.clearInputFiles()
  }
  alertDownloadCompleted() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Upload Concluido com Sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    this.clearInputFiles()
  }


  clearInputFiles() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home'], {
      relativeTo: this.route,
    });
  }

  modifyDisplay() {
    if (document != null) {
      const documentIdDivUp = window.document.getElementById('divUp')!;
      documentIdDivUp.style.display = 'inline';
      this.uploadReport = false;
      this.selectedFilesStr = 'Selecione os arquivos de Layout.';
    }
  }

  modifyDisplayUploadNewRel() {
    if (document != null) {
      const documentIdDivUp = window.document.getElementById('divUpRel')!;
      documentIdDivUp.style.display = 'inline';
      this.uploadReport = true;
      if (this.selectedFilesStrReport === '') {
        this.selectedFilesStrReport = 'Selecione o relatório atualizado.';
      }
    }
  }

  modifyDisplayUploadListNcm() {
    if (document != null) {
      const documentIdDivUp = window.document.getElementById('divUpListNcm')!;
      documentIdDivUp.style.display = 'inline';
      this.uploadReport = true;
      if (this.selectedFilesStrReport === '') {
        this.selectedFilesStrReport = ' Selecione a listagem NCM.';
      }
    }
  }

  removeItemList(i: any) {
    this.newSetFileListUp.splice(i, 1);
    console.log(this.newSetFileListUp);
  }

  removeItemListAt(i: any) {
    this.newSetFileListAt.splice(i, 1);
    console.log(this.newSetFileListAt);
  }

  removeItemListNcm(i: any) {
    this.newSetFileListNcm.splice(i, 1);
    console.log(this.newSetFileListNcm);
  }

  onFileChanged(event: any) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.setFileListUp.push(this.selectedFiles[i]);
    }
    Array.prototype.push.apply(this.newSetFileListUp, this.setFileListUp);
    console.log(this.setFileListUp);
    this.files = new Set();
    this.updateFilesStr();
    this.progress = 0;
  }

  onFileReportChanged(event: any) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.setFileListAt.push(this.selectedFiles[i]);
    }
    Array.prototype.push.apply(this.newSetFileListAt, this.setFileListAt);
    console.log(this.setFileListAt);
    this.files = new Set();
    this.updateFilesNewReportStr();
  }

  onFileListNcm(event: any) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.setFileListNcm.push(this.selectedFiles[i]);
    }
    Array.prototype.push.apply(this.newSetFileListNcm, this.setFileListNcm);
    this.files = new Set();
    this.updateFilesNewReportStr();
  }

  updateFilesStr() {
    this.selectedFilesStr = '';

    const filesNumber = this.selectedFiles.length;
    let concatStr = filesNumber === 1 ? '' : ',';
    for (var i = 0; i < filesNumber; i++) {
      this.selectedFilesStr += this.selectedFiles[i].name.concat(concatStr);
      this.files?.add(this.selectedFiles[i]);
    }
  }

  updateFilesNewReportStr() {
    this.selectedFilesStrReport = '';
    this.selectedFilesStrReport = this.selectedFiles[0].name;
    this.files?.add(this.selectedFiles[0]);
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService
        .upload(
          this.files,
          'http://localhost:8080/api/v1/persist-layouts/save-files'
        )
        .subscribe((event: HttpEvent<Object>) => {
          console.log(event);
          if (event.type == HttpEventType.UploadProgress) {
            if (event.total) {
              const percentDone = Math.round(
                (event.loaded * 100) / event.total
              );
              console.log('Progresso', percentDone);
              this.progress = percentDone;
            }
          } else if (event.type == HttpEventType.Response) {
            console.log('upload dos layouts concluído.');
            const barProgress = window.document.getElementById('bar')!;
            barProgress.style.display = 'none';
            this.alertUploadCompleted()
          }
        });
    }
  }

  onUploadNewReport() {
    if (this.files && this.files.size > 0) {
      this.uploadService
        .upload(
          this.files,
          'http://localhost:8080/api/v1/process-result-final/save-report'
        )
        .subscribe((event: HttpEvent<Object>) => {
          console.log(event.type);
          if (event.type == HttpEventType.UploadProgress) {
            if (event.total) {
              const percentDone = Math.round(
                (event.loaded * 100) / event.total
              );
              console.log('Progresso', percentDone);
              this.progress = percentDone;
            }
          } else if (event.type == HttpEventType.Response) {
            console.log('upload dos Relatórios concluído.');
            const barProgress = window.document.getElementById('bar')!;
            barProgress.style.display = 'none';
            this.alertUploadCompleted()
          }
        });
    }
  }

  onUploadListNCM() {
    let url = 'http://localhost:8080/api/v1/ncm-upload-charge';
    if (this.files && this.files.size > 0) {
      const formData = new FormData();
      formData.append('file', this.selectedFiles[0]);
      console.log(formData);
      this.http.post(url, formData).subscribe(() => alert('upload NCM concluído.'));
    }
  }

  exportProcessResultCsv() {
    this.downloadService
      .export()
      .subscribe((csvContent) =>
        fileSaver.saveAs(
          new Blob([csvContent], { type: 'application/csv' }),
          'RESULTADO CROSS LAYOUTS.csv'
        )
      );
  }

}
