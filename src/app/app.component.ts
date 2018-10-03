import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  news;
  topNews = [];
  order = [];
  orderPriority = [];
  range = 10;
  show = false;
  search = '';
  date = new Date();

  constructor (
    public data: DataService
  ) { }

  ngOnInit() {
    this.getNewsData();
  }

  getNewsData() {
    const dateParsed = `${this.date.getFullYear()}-${('00' + (this.date.getMonth() + 1)).slice(-2)}-${('00' + this.date.getDate()).slice(-2)}`;
    this.data.getNews().subscribe(res => {
      // console.log(res);
      this.setNews(res);
    }, err => {
      console.log(err);
    });
  }

  setNews(res) {
    if (res) {
      this.news = res;
      const news_priority = this.news.map(x => x.priority == 0);
      const highest_priority_num = news_priority.reduce((a, b) => a + b, 0) - news_priority[0];
      let high_priority_counter = 0;

      this.news.forEach(news => {
        if (news.order == 0) {
          this.order.push(news);
        } else {
          if (this.orderPriority.length <= 3) {
            if (news.priority == 0) {
              this.orderPriority.push(news);
            } else if (news.priority == 1 && high_priority_counter <= 3 - highest_priority_num) {
              this.orderPriority.push(news);

              high_priority_counter += 1;
            } else if (this.topNews.length < 7) {
              this.topNews.push(news);
            }
          } else if (this.topNews.length < 7) {
            this.topNews.push(news);
          }
        }
      });
    }
  }
}
