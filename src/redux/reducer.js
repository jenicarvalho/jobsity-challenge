import { createStore } from 'redux'

const initialState = {
  reminder: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_REMINDER':
      return {
        ...state,
        reminder: action.payload
      };
    case 'POST_REMINDER':
      return {
        ...state,
        reminder: [...state.reminder, action.payload]
      };

    default:
      return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store