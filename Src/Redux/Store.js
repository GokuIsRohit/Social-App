import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UserReducer } from '../Redux/Reducer/UserReducer';

const rootReducer=combineReducers({
    UserReducer
})

export const Store = createStore(rootReducer, applyMiddleware(thunk));