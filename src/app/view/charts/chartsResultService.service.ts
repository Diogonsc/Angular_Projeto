import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataModel } from './../charts/model/charts-data.model';

@Injectable({
  providedIn: 'root'
})
export class ChartsResultService {
  private chartsDataEndPoint: string = 'http://localhost:8080/api/v1/process-result-final/generate-info-dashboard';

  constructor(private http: HttpClient) { }

  generateData() {
    return this.http.get<ChartDataModel>(this.chartsDataEndPoint)
  }
}
