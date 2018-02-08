import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  failed: any;
}

const initialState: State = {
  token: null,
  authenticated: false,
  failed: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true,
        failed: false
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    case (AuthActions.AUTH_FAIL):
      return {
        ...state,
        failed: action.payload
      };
    default:
      return state;
  }
}
