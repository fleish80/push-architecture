import {HttpErrorResponse} from '@angular/common/http';

export class StateContext<T> {
  data?: T;
  errorResponse?: HttpErrorResponse;
  loading: boolean;
  statusCode?: number;
}
