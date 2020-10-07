import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private userId$ = new ReplaySubject<number>(1);

  constructor() { }

  setUserId(userId) {
    this.userId$.next(userId);
  }

  getUSerId$(): Observable<number> {
    return this.userId$.asObservable();
  }
}
