import {ComponentStore} from '@ngrx/component-store';
import {StateContext} from '../models/state-context.model';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export abstract class AbstractStore<T> extends ComponentStore<StateContext<T>> {

  protected constructor(initialState: T) {
    super({
      data: initialState,
      loading: false
    })
  }

  readonly data$: Observable<T> = this.select<T>((stateContext: StateContext<T>) => stateContext.data);
  readonly loading$: Observable<boolean> = this.select<boolean>((stateContext: StateContext<T>) => stateContext.loading);
  readonly errorResponse$: Observable<HttpErrorResponse> = this.select<HttpErrorResponse>((stateContext: StateContext<T>) => stateContext.errorResponse);
  readonly statusCode$: Observable<number> = this.select<number>((stateContext: StateContext<T>) => stateContext.statusCode);


  updateData(data: T) {
    this.patchState({data});
  }

  updateLoading(loading: boolean) {
    this.patchState({loading});
  }

  updateError(errorResponse: HttpErrorResponse) {
    this.patchState({errorResponse});
  }

  updateStatusCode(statusCode: number) {
    this.patchState({statusCode});
  }

  abstract load;

}
