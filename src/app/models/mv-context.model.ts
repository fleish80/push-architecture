import {HttpErrorResponse} from '@angular/common/http';

export class MVContext<T> {
  data?: T;
  errorResponse?: HttpErrorResponse;
  loading: boolean;
  statusCode?: number;
}
