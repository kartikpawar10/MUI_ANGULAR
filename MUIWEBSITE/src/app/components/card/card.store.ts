import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, Observable, take, tap } from 'rxjs';
import { CardServiceService } from 'src/app/services/card-service.service';

export interface StateDataType {
  arrayVal: any;
  process: boolean;
  error: boolean;
}
@Injectable()
export class PostsStore extends ComponentStore<StateDataType> {
  readonly arrayVal$ = this.select((state) => state.arrayVal);
  readonly error$ = this.select((state) => state.error);
  readonly process$ = this.select((state) => state.process);

  vm$ = this.select({
    arrayVal: this.arrayVal$,
    error: this.error$,
    process: this.process$,
  });

  // Updater Function
  setArrayVal = this.updater((state) => ({ ...state, arrayVal: [] }));
  setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
  }));
  addArrayVal = this.updater((state, arrayVal: any) => ({
    ...state,
    arrayVal,
  }));

  // Effect
  getPosts = this.effect((trigger$) => {
    return trigger$.pipe(
      //   tap(() => {
      //     // this.patchState({ arrayVal: [] }); // Instead of patchState we can use setArrayVal()
      //     this.setArrayVal();
      //   }),
      exhaustMap(() => {
        return this.cardService.getData().pipe(
          tapResponse(
            (response) => {
              console.log(response);
              this.addArrayVal(response);
            },
            (err: HttpErrorResponse) => this.setError(err)
          )
        );
      })
    );
  });

  constructor(private cardService: CardServiceService) {
    super({
      arrayVal: [{ title: 'Test Title', image: 'Test Image' }],
      process: false,
      error: false,
    });
  }
}
