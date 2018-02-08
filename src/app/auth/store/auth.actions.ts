import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const AUTH_FAIL = 'AUTH_FAIL';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {username: string, password: string}) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {username: string, password: string}) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: any) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | AuthFail | Logout | SetToken | TrySignup | TrySignin;
