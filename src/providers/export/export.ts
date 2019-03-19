import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as papa from 'papaparse';

@Injectable()
export class ExportProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ExportProvider Provider');
  }

  private dataToDownload(fileName, finalData) {
      let blob = new Blob([finalData]);
      let a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      a.remove();
  }

  public exportDataToCSV(fileName: string, dataList: any) {
    let csv = papa.unparse(JSON.stringify(dataList));
    this.dataToDownload(fileName, csv);
  }

  public exportDataToJSON(fileName: string, dataList: any) {
    this.dataToDownload(fileName, JSON.stringify(dataList));
  }

}
