import { call, fork, put, take } from 'redux-saga/effects';
import { firebaseAuth } from '../firebase';
import history from '../history';
import { authActions } from './actions';


function* signIn(authProvider) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithPopup], authProvider);
    yield put(authActions.signInSuccess(authData.user));
    yield history.push('/');
  }
  catch (error) {
    yield put(authActions.signInFailed(error));
  }
}

function* signOut() {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(authActions.signOutSuccess());
    yield history.replace('/sign-in');
  }
  catch (error) {
    yield put(authActions.signOutFailed(error));
  }
}


// Watchers

function* watchSignIn() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN);
    yield fork(signIn, payload.authProvider);
  }
}

function* watchSignOut() {
  while (true) {
    yield take(authActions.SIGN_OUT);
    yield fork(signOut);
  }
}



export const authSagas = [
  fork(watchSignIn),
  fork(watchSignOut)
];
