import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MVContext} from '../models/mv-context.model';

export class AbstractStoreService<T> {

  protected url: string;
  protected params: { [paramKey: string]: any };
  protected storeSubject$: BehaviorSubject<MVContext<T>>;

  protected constructor(protected http: HttpClient) {
    this.storeSubject$ = new BehaviorSubject<MVContext<T>>({loading: false});
  }

  getStore(): Observable<MVContext<T>> {
    return this.storeSubject$.asObservable();
  }

  load(): void {
    this.storeSubject$.next({...this.storeSubject$.getValue(), ...{loading: true}});
    this.http.get<T>(this.url, {params: this.params, observe: 'response'})
      .pipe(
        map((httpResponse: HttpResponse<T>) => {
          return {
            data: httpResponse.body,
            loading: false,
            statusCode: httpResponse.status
          };
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          console.error(errorResponse);
          return of({
            errorResponse,
            loading: false,
            statusCode: errorResponse.status
          });
        }))
      .subscribe((contextVar: MVContext<T>) => {
        this.storeSubject$.next(contextVar);
      });
  }
}
