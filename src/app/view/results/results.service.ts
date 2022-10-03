import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessResultModel } from './model/process-result';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private endpoint: string =
    'http://localhost:8080/api/v1/process-result-final/greatest-values';

  constructor(private http: HttpClient) {}

  generateData(type: string, pag: string): Observable<ProcessResultModel> {
    return this.http
      .get<ProcessResultModel>(
        this.endpoint.concat('/').concat(type).concat('?page=').concat(pag)
      )
      .pipe();
  }

  generateDataPeriod(
    type: string,
    pag: string,
    periodStart: string,
    periodEnd: string
  ): Observable<ProcessResultModel> {
    return this.http
      .get<ProcessResultModel>(
        this.endpoint
          .concat('/')
          .concat(type)
          .concat('?page=')
          .concat(pag)
          .concat('&periodStart=')
          .concat(periodStart)
          .concat('&periodEnd=')
          .concat(periodEnd)
      )
      .pipe();
  }
}
