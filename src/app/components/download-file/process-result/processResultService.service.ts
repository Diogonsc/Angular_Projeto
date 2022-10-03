import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessResultService {

constructor(private http : HttpClient) { }

export(){
  let exportUrl = 'http://localhost:8080/api/v1/process-result-final/export';
  return this.http
              .post(exportUrl, null, { responseType: "arraybuffer"});
}


}
