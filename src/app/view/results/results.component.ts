import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessResultModel } from './model/process-result';
import { ResultsService } from './results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  dados!: ProcessResultModel;
  currentPage: number = 1;
  totalPages: number = 10;
  tipoReq: string = '';
  periodStart: string = '';
  periodEnd: string = '';
  type: string = '';
  reload: boolean = true;
  loading: boolean = true;
  temosDados: boolean = true;
  collapse: boolean = false;
  dateStart?: any = '';
  dateEnd?: any = '';

  constructor(
    private service: ResultsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listInit().then(() => {
      (
        document.getElementsByClassName('visually-hidden')[0] as HTMLElement
      ).textContent = '';
    });
    this.generateList('bonusEntrance', '1');
  }

  async listInit(): Promise<void> {
    this.generateList(this.tipoReq, '1');
  }

  alertMessageInfo() {
    let alerta = document.getElementById('alert-msg');
    alerta?.classList.toggle('d-none');
    setTimeout(() => {
      alerta?.classList.toggle('d-none');
      this.clearFilterDatepicker()
    }, 3000);
  }

  pagChange(): void {
    setTimeout(() => {
      this.generateList(this.tipoReq, this.currentPage.toString());
      (
        document.getElementsByClassName('visually-hidden')[0] as HTMLElement
      ).textContent = '';
    }, 1);
  }

  clearFilterDatepicker() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/listagem'], {
      relativeTo: this.route,
    });
  }

  btnFilterReverse() {
    if (
      this.periodStart != 'undefined-undefined-undefined' &&
      this.periodEnd != 'undefined-undefined-undefined'
    ) {
      const documentBtnFilter = document.getElementById('filter')!;
      documentBtnFilter.style.display = 'none';
      const documentBtnClearFilter = document.getElementById('clearFilter')!;
      documentBtnClearFilter.style.display = '';

    } else {
      const documentBtnFilter = document.getElementById('filter')!;
      documentBtnFilter.style.display = '';
      const documentBtnClearFilter = document.getElementById('clearFilter')!;
      documentBtnClearFilter.style.display = 'none';
      this.alertMessageInfo()
    }
  }

  formatDatepicker() {
    let monthStart =
      this.dateStart.month < 10
        ? '0' + this.dateStart.month
        : this.dateStart.month;
    let dayStart =
      this.dateStart.day < 10 ? '0' + this.dateStart.day : this.dateStart.day;
    let monthEnd =
      this.dateEnd.month < 10 ? '0' + this.dateEnd.month : this.dateEnd.month;
    let dayEnd =
      this.dateEnd.day < 10 ? '0' + this.dateEnd.day : this.dateEnd.day;
    this.periodStart = `${this.dateStart.year}-${monthStart}-${dayStart}`;
    this.periodEnd = `${this.dateEnd.year}-${monthEnd}-${dayEnd}`;
    this.service;
    this.btnFilterReverse();
    this.generateList('bonusEntrance', '1');
  }

  generateList(type: string, pag: string) {
    this.type = type;
    this.loading = true;
    if (!this.periodStart && !this.periodEnd) {
      this.service.generateData(type, pag).subscribe(
        (resp: ProcessResultModel) => {
          this.dados = resp;
          this.totalPages = resp.totalPages * 10 - 10;
          this.currentPage = parseInt(pag);
          this.loading = false;
          this.temosDados = true;
        },
        (err: any) => {
          this.loading = false;
          this.temosDados = false;
        }
      );
    } else if (this.periodStart != '' && this.periodEnd != '') {
      this.service
        .generateDataPeriod(type, pag, this.periodStart, this.periodEnd)
        .subscribe(
          (resp: ProcessResultModel) => {
            this.dados = resp;
            this.totalPages = resp.totalPages * 10 - 10;
            this.currentPage = parseInt(pag);
            this.loading = false;
            this.temosDados = true;
          },
          (err: any) => {
            this.loading = false;
            this.temosDados = false;
          }
        );
    }

    this.reverseButtonsColor();
    if (type === 'bonusExit') {
      const documentBonusExit = window.document.getElementById('bonusExit')!;
      documentBonusExit.className = 'btn btn-list-dark';
      this.tipoReq = 'bonusExit';
    }
    if (type === 'bonusEntrance') {
      const documentBonusExit =
        window.document.getElementById('bonusEntrance')!;
      documentBonusExit.className = 'btn btn-list-dark';
      this.tipoReq = 'bonusEntrance';
    }
    if (type === 'onusEntrance') {
      const documentBonusExit = window.document.getElementById('onusEntrance')!;
      documentBonusExit.className = 'btn btn-list-dark';
      this.tipoReq = 'onusEntrance';
    }
    if (type === 'onusExit') {
      const documentBonusExit = window.document.getElementById('onusExit')!;
      documentBonusExit.className = 'btn btn-list-dark';
      this.tipoReq = 'onusExit';
    }
  }

  reverseButtonsColor() {
    const documentBonusExit = window.document.getElementById('bonusExit')!;
    documentBonusExit.className = 'btn btn-list';
    const documentBonusEntrance =
      window.document.getElementById('bonusEntrance')!;
    documentBonusEntrance.className = 'btn btn-list';
    const documentOnusExit = window.document.getElementById('onusEntrance')!;
    documentOnusExit.className = 'btn btn-list';
    const documentOnusEntrance = window.document.getElementById('onusExit')!;
    documentOnusEntrance.className = 'btn btn-list';
  }

}
