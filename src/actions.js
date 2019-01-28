const makeActionDefault = (payload) => ({ payload })

export const formOnSubmit = (func) => (data, dispatch) => dispatch(func(data))

const makeActionCreator = (makeAction, type) => (...args) => {
  const action = makeAction(...args)
  if (typeof action === 'object') {
    action.type = type
  }
  return action
}

export const POSTFIX = {
  request: '/REQUEST',
  success: '/SUCCESS',
  failure: '/FAILURE'
}

export function syncAction (type, makeAction = makeActionDefault) {
  const actionCreator = makeActionCreator(makeAction, type)
  actionCreator.type = type
  actionCreator.onSubmit = formOnSubmit(actionCreator)
  return actionCreator
}

export function asyncAction (base, makeAction = makeActionDefault) {
  const actionCreator = makeActionCreator(makeAction, `${base}${POSTFIX.request}`)

  actionCreator.request = `${base}${POSTFIX.request}`
  actionCreator.success = `${base}${POSTFIX.success}`
  actionCreator.failure = `${base}${POSTFIX.failure}`
  actionCreator.onSubmit = formOnSubmit(actionCreator)
  return actionCreator
}
