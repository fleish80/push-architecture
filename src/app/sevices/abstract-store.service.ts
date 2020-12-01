import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MVContext} from '../models/mv-context.model';
import {reduxExtension} from '../utils/redux-extension.util';

export class AbstractStoreService<T> {

  private url: string;
  private params: { [paramKey: string]: any };
  protected storeSubject$: BehaviorSubject<MVContext<T>>;

  protected constructor(protected http: HttpClient, url?: string, params?: { [paramKey: string]: any }) {
    this.storeSubject$ = new BehaviorSubject<MVContext<T>>({loading: false});
    this.url = url;
    this.params = params;
  }

  getStore(): Observable<MVContext<T>> {
    return this.storeSubject$.asObservable();
  }

  load(url?: string, params?: { [paramKey: string]: any }): void {
    if (url) {
      this.url = url;
    }
    if (params) {
      this.params = params;
    }
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
          reduxExtension.sendAction(this.constructor, contextVar);
          this.storeSubject$.next(contextVar);
        });
  }
}
