import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import '../../styles/InterviewIndex/InterviewIndex.css'
import { setInterviews } from '../../actions/Interview'
import Interview from './Interview'


function InterviewIndex({ dispatch, interviews }) {

    useEffect(() => {
        axios.get('http://localhost:3001/interviews')
        .then(response => {
            //console.log(response)
            if(response.data.status === 'success') dispatch(setInterviews(response.data.interviews))
            else alert('Error')
        })
        .catch(error => alert('Server Error: ', error))
    }, [])

    return (
        <div className = "main-container">
            <div className = "main-link">
                <Link to = "/create">Create Interview</Link>
            </div>
            {
                interviews.map(interview => {
                    return <Interview  key = {interview.id} 
                        id = {interview.id} title = {interview.title}
                        start_time = {interview.start_time} end_time = {interview.end_time}
                        participants = {interview.participants} resume = {interview.resume} />
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        interviews: state.interview
    }
}

export default connect(mapStateToProps)(InterviewIndex)
