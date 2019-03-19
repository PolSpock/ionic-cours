import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as papa from 'papaparse';

/*
  Generated class for the ExportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
    let csvData: any[] = [];
    let headerRow: any[] = [];

    let parsedData = papa.parse(JSON.stringify(dataList), {
      quotes: false, //or array of booleans
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ",",
      header: true,
      newline: "\r\n",
      skipEmptyLines: false,
      columns: null
    }).data;
    headerRow = parsedData[0];

    console.log(headerRow);

    parsedData.splice(0, 1);
    csvData = parsedData;

    console.log(csvData);

    let finalCSV = papa.unparse({
      fields: headerRow,
      data: dataList
    });

    this.dataToDownload(fileName, finalCSV);
  }

  public exportDataToJSON(fileName: string, dataList: any) {
    this.dataToDownload(fileName, JSON.stringify(dataList));
  }

}
