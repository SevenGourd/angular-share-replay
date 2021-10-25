import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ';
  data$: Observable<any>;

  myData: any;

  constructor(private http: HttpClient) {
    this.init(true);
  }

  init(useCache: boolean = true) {
    this.data$ = this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(console.log),
        useCache ? shareReplay(1) : tap(() => null),
        tap(() => console.log('after sharing'))
      );
  }

  getData() {
    this.data$.subscribe((data) => (this.myData = data));
  }

  clearData() {
    this.myData = null;
  }

  cacheMode() {
    this.init();
  }

  noCacheMode() {
    this.init(false);
  }
}
