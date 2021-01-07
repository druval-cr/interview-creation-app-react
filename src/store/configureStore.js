import { createStore, applyMiddleware, combineReducers } from 'redux'
import interviewReducer from '../reducers/Interview'
import thunk from 'redux-thunk'

// Store creation
const store = createStore(
    combineReducers({
        interview: interviewReducer
    }),
    applyMiddleware(thunk)
);

export default store