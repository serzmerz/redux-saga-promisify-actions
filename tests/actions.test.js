import { asyncAction, syncAction } from '../src'

describe('test action creators functions', () => {
  const type = 'ITEM/GET_ITEM'

  test('test sync action creator', () => {
    const action = syncAction(type)
    expect(action.type).toBe(type)
    expect(action.onSubmit).toBeInstanceOf(Function)
    expect(action({ data: 'some' })).toEqual({
      type,
      payload: {
        data: 'some'
      }
    })
  })

  test('test async action creator', () => {
    const action = asyncAction(type)
    expect(action.request).toBe('ITEM/GET_ITEM/REQUEST')
    expect(action.success).toBe('ITEM/GET_ITEM/SUCCESS')
    expect(action.failure).toBe('ITEM/GET_ITEM/FAILURE')
    expect(action.onSubmit).toBeInstanceOf(Function)
    expect(action({ data: 'some' })).toEqual({
      type: 'ITEM/GET_ITEM/REQUEST',
      payload: {
        data: 'some'
      }
    })
  })
})
