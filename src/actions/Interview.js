import { SET_INTERVIEWS, DELETE_INTERVIEW } from './actionTypes'

export const setInterviews = (interviews) => {
    return {
        type: SET_INTERVIEWS,
        payload: interviews
    }
}

export const deleteInterview = (id) => {
    return {
        type: DELETE_INTERVIEW,
        payload: id
    }
}