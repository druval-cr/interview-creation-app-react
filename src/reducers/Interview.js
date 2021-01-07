import { SET_INTERVIEWS, DELETE_INTERVIEW } from '../actions/actionTypes'

const interviewReducer = (state = [], action) => {
    switch (action.type){
        case SET_INTERVIEWS:
            return action.payload
        case DELETE_INTERVIEW:
            return state.filter(interview => interview.id !== action.payload);
        default: return state
    }
}

export default interviewReducer