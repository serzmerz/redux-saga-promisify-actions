import { call, take, all, race, put, takeEvery } from 'redux-saga/effects'
import { PROMISIFY_SERVICE_ACTION } from './constants'

const getPayload = (data) => (data && data.payload) || data

export function * handlePromiseAction (action) {
  const {
    payload,
    meta: {
      routine,
      defer: { resolve, reject }
    }
  } = action

  const [{ success, failure }] = yield all([
    race({
      success: take(routine.success),
      failure: take(routine.failure)
    }),
    put(routine(payload))
  ])

  if (success) {
    yield call(resolve, getPayload(success))
  } else {
    yield call(reject, getPayload(failure))
  }
}

export function * actionsPromiseWatcherSaga () {
  yield takeEvery(PROMISIFY_SERVICE_ACTION, handlePromiseAction)
}
