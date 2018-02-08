import { Action } from '@ngrx/store';

import { Timestamp } from '../timestamp.model';

export const SET_TIMESTAMPS = 'SET_TIMESTAMPS';
export const ADD_TIMESTAMP = 'ADD_TIMESTAMP';
export const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP';
export const FINISH_NOW = 'FINISH_NOW';
export const DELETE_TIMESTAMP = 'DELETE_TIMESTAMP';
export const STORE_TIMESTAMPS = 'STORE_TIMESTAMPS';
export const FETCH_TIMESTAMPS = 'FETCH_TIMESTAMPS';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class SetTimestamps implements Action {
  readonly type = SET_TIMESTAMPS;

  constructor(public payload: Timestamp[]) {}
}

export class AddTimestamp implements Action {
  readonly type = ADD_TIMESTAMP;

  constructor(public payload: Timestamp) {}
}

export class UpdateTimestamp implements Action {
  readonly type = UPDATE_TIMESTAMP;

  constructor(public payload: Timestamp) {}
}

export class FinishNow implements Action {
  readonly type = FINISH_NOW;

  constructor(public payload: string) {}
}

export class DeleteTimestamp implements Action {
  readonly type = DELETE_TIMESTAMP;
}

export class StoreTimestamps implements Action {
  readonly type = STORE_TIMESTAMPS;
}

export class FetchTimestamps implements Action {
  readonly type = FETCH_TIMESTAMPS;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: Timestamp) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type TimerActions = 
  SetTimestamps |
  AddTimestamp |
  UpdateTimestamp |
  FinishNow |
  DeleteTimestamp |
  StoreTimestamps |
  FetchTimestamps |
  StartEdit |
  StopEdit;