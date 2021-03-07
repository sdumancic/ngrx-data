import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {Course} from '../model/course';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {Update} from '@ngrx/entity';

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {

  constructor(http: HttpClient,
              httpUrlGenerator: HttpUrlGenerator) {
    super('Course', http, httpUrlGenerator);
  }

  getAll(): Observable<Course[]> {
    return this.http.get('/api/courses')
      .pipe(
        map(res => res['payload'])
      );
  }

  update(update: Update<Course>): Observable<Course> {
    return super.update(update);
  }

}


