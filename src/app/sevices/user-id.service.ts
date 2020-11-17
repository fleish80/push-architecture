import {Injectable} from '@angular/core';
import {ReactiveState} from '../models/reactive-state.model';

@Injectable({
  providedIn: 'root'
})
export class UserIdService extends ReactiveState<number> {
}
