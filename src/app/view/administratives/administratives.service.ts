import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdministrativesService {
  constructor(private http: HttpClient) {}

  upload(files: Set<File>, url: string) {
    const formData = new FormData();

    var i = 1;
    for (let file of files) {
      formData.append('file'.concat(i.toString()), file, file.name);
      i++;
    }

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }
}
