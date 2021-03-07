import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseEntityService} from './course-entity.service';
import {filter, first, map, tap} from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(private coursesService: CourseEntityService) {}

// root transition is complete when Observable returned from resolve completes
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {

    return this.coursesService.loaded$
      .pipe(
        tap( loaded => {
          if (!loaded) {
            this.coursesService.getAll()
              .pipe(
                map(courses => !!courses)
              );
          }
        }),
        filter(loaded => !!loaded), // this makes sure we wait for the data to load
        first() // this makes sure we complete the observable
      );
  }

}
