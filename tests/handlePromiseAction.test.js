import { takeEvery, all, race, take, put, call } from 'redux-saga/effects'
import {
  actionsPromiseWatcherSaga,
  asyncAction,
  handlePromiseAction,
  PROMISIFY_SERVICE_ACTION,
  getPayload
} from '../src'

describe('actionsPromiseWatcherSaga', () => {
  test('take every routine promise action and run promise handler', () => {
    const iterator = actionsPromiseWatcherSaga()
    expect(iterator.next().value).toEqual(takeEvery(PROMISIFY_SERVICE_ACTION, handlePromiseAction))
    expect(iterator.next().done).toBe(true)
  })
})

describe('handlePromiseAction', () => {
  let iterator
  let resolve
  let reject
  let routine
  let payload
  beforeEach(() => {
    resolve = jest.fn()
    reject = jest.fn()
    routine = asyncAction('A')
    payload = { data: 'some' }
    iterator = handlePromiseAction({
      type: PROMISIFY_SERVICE_ACTION,
      payload,
      meta: {
        defer: { resolve, reject },
        routine
      }
    })
  })

  test('check if race between SUCCESS and FAILURE started', () => {
    expect(iterator.next().value).toEqual(all([
      race({
        success: take(routine.success),
        failure: take(routine.failure)
      }),
      put(routine(payload))
    ]))
  })

  test('success flow', () => {
    const winner = { success: true }
    iterator.next()
    expect(iterator.next([winner]).value).toEqual(call(resolve, getPayload(winner.success)))
  })

  test('failure flow', () => {
    const loser = { failure: true }
    iterator.next()
    expect(iterator.next([loser]).value).toEqual(call(reject, getPayload(loser.failure)))
  })
})
