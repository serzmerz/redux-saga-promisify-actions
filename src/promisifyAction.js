import { PROMISIFY_SERVICE_ACTION } from './constants'

export function promisifyAction (routine) {
  return (payload, dispatch) =>
    new Promise((resolve, reject) =>
      dispatch({
        type: PROMISIFY_SERVICE_ACTION,
        payload,
        meta: {
          defer: { resolve, reject },
          routine
        }
      })
    )
}
