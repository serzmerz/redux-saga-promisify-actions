import { promisifyAction } from './promisifyAction'

export const bindPromiseCreator = (action, dispatch) => (data) => action(data, dispatch)

export const bindPromiseToAction = (action, dispatch) => (data) => promisifyAction(action)(data, dispatch)
