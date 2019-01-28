import { promisifyAction, PROMISIFY_SERVICE_ACTION } from '../src'

describe('promisifyAction', () => {
  test('should be a function', () => {
    expect(promisifyAction).toBeInstanceOf(Function)
  })
  test('should wrap action into function that returns promise', () => {
    const actionCreator = () => ({ data: 'some' })
    const handler = promisifyAction(actionCreator)
    const dispatch = jest.fn()
    const payload = {
      data: 'some'
    }
    expect(handler(payload, dispatch)).toBeInstanceOf(Promise)
    expect(dispatch).toBeCalled()
    expect(dispatch.mock.calls.length).toBe(1)
    const action = dispatch.mock.calls[0][0]
    expect(action.type).toBe(PROMISIFY_SERVICE_ACTION)
    expect(action.payload).toEqual(payload)
    expect(action).toHaveProperty('meta.defer.resolve')
    expect(action).toHaveProperty('meta.defer.reject')
    expect(action.meta.routine).toBe(actionCreator)
  })
})
