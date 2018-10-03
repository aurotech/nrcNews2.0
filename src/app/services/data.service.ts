import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    public http: HttpClient
  ) { }

  getNews() {
    return this.http.get('http://ec2-54-86-212-61.compute-1.amazonaws.com:8080/pullJiraNews/get_news/0');
  }

  getNewsWithDate(date) {
    return this.http.get(`http://ec2-54-86-212-61.compute-1.amazonaws.com:8080/pullJiraNews/date_news/0/${date}`);
  }
  serachForResults(key) {
    return this.http.get(`http://ec2-54-86-212-61.compute-1.amazonaws.com:8080/pullJiraNews/search_news/0/${key}`);
  }
}
