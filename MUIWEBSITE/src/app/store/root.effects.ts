import { Injectable, OnInit } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as rootActions from './root.action';
import { CardServiceService } from '../services/card-service.service';
import { NavBarService } from '../services/nav-bar.service';

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions,
    private cardService: CardServiceService,
    private data: NavBarService
  ) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(ofType(rootActions.loadProducts), () =>
      this.cardService.getData().pipe(
        map((response) => {
          return rootActions.loadProductsSuccess({ products: response });
        }),
        catchError((error) => {
          return of(rootActions.loadProductsFailure({ error: true }));
        })
      )
    )
  );
}
