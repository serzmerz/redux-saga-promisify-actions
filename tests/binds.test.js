import { bindPromiseToAction, bindPromiseCreator } from '../src'

describe('test binds functions', () => {
  let actionCreator
  let dispatch
  let data
  beforeEach(() => {
    actionCreator = jest.fn()
    dispatch = jest.fn()
    data = { some: true }
  })
  test('bindPromiseToAction', () => {
    const action = bindPromiseToAction(actionCreator, dispatch)(data)
    expect(action).toBeInstanceOf(Promise)
  })
  test('bindPromiseCreator', () => {
    bindPromiseCreator(actionCreator, dispatch)(data)
    expect(actionCreator).toBeCalledTimes(1)
    expect(actionCreator).toBeCalledWith(data, dispatch)
  })
})
