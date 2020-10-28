import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { historyUrl } from '../config/api';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  postHistory(transac){
      return this.http.post(historyUrl, transac);
  }
}
