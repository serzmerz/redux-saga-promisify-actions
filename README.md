## redux-saga-promisify-actions

![](https://img.shields.io/npm/v/redux-saga-promisify-actions.svg)
![](https://img.shields.io/npm/l/redux-saga-promisify-actions.svg)

## Motivation

When you make side effects in the saga, your component doesn't know about data flow, for this reason, this package makes a promise from your action creator like redux-thunk. It's makes possible use any form state management package without tears.

## Installation

```javascript
 yarn add redux-saga-promisify-actions
```

## Usage

Functions **syncAction** and **asyncAction** make one action creator and encapsulated types.

##### syncAction

```javascript
 import { syncAction } from 'redux-saga-promisify-actions'
 
 // make action creator
 const getItem = syncAction('ITEM/GET_ITEM')
 
 getItem.type === 'ITEM/GET_ITEM'
 
 getItem({ data: 'data' }) === { type: 'ITEM/GET_ITEM', payload: { data: 'data' } }
```

For making custom action structure use second param
```javascript
const getItem = syncAction('ITEM/GET_ITEM', (data) => ({ data, params: data.params }))

getItem({ data: { params: [1, 2] } }) === { type: 'ITEM/GET_ITEM', data: { params: [1, 2] }, params: [1, 2] }
```

##### asyncAction

It's similar to **syncAction** but with types: request, success, failure

```javascript
import { asyncAction } from 'redux-saga-promisify-actions'

const getItem = asyncAction('ITEM/GET_ITEM')

getItem.request === 'ITEM/GET_ITEM/REQUEST'

getItem.success === 'ITEM/GET_ITEM/SUCCESS'

getItem.failure === 'ITEM/GET_ITEM/FAILURE'
```

### Wrap action into promise

##### Installation

In your create store function

```javascript
import { actionsPromiseWatcherSaga } from "redux-saga-promisify-actions";

sagaMiddleware.run(actionsPromiseWatcherSaga);
```

In your components:

```javascript
import { bindPromiseToAction } from "redux-saga-promisify-actions";

class MyComponent extends Component {
  componentDidMount() {
    this.props
      .getItems({ data: "data" })
      .then((payload) => console.log("success", payload)) // { data: "data" }
      .catch((payload) => console.log("reject", payload));
  }
  ...
  render() {
    ...
  }
  }
  
  export default connect(
    null,
    (dispatch) => ({ getItems: bindPromiseToAction(getItems, dispatch) })
  )(MyComponent);
```
