import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  loading: false,
  list: [],
  films:[]
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'LOADING':
      return Object.assign({}, state, {
        loading: action.value
      })
      
    case 'LIST':
      return Object.assign({}, state, {
        loading: false,
        list: action.value
      })
      case 'SET_FILMS':
        return Object.assign({}, state, {
          loading: false,
          films: action.value
        })
      
    default:
      return state;
  }
};

export default createStore(reducer, initialState, applyMiddleware(thunk));
