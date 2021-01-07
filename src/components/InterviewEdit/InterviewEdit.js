import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'react-external-link';

import '../../styles/InterviewEdit/InterviewEdit.css'

function Interviewedit(props) {
    
    //console.log(props.match.params.id);
    let currentTime = new Date()
    currentTime = currentTime.toISOString().split('Z')[0]
    const interviewID = props.match.params.id;
    const [title, setTitle] = useState('')
    const [participants, setParticipants] = useState('')
    const [startTime, setStartTime] = useState(currentTime)
    const [endTime, setEndTime] = useState(currentTime)
    const [currentResume, setCurrentResume] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3001/interviews/${interviewID}`)
        .then(response => {
            console.log(response);
            if(response.data.status === 'success'){
                const interview = response.data.interview
                setTitle(interview.title)
                setParticipants(interview.participants)
                setStartTime(interview.start_time.split(":00.000Z")[0])
                setEndTime(interview.end_time.split(":00.000Z")[0])
                setCurrentResume(interview.resume)
            }
            else if(response.data.status === 'error') alert(response.data.message);
            else{
                props.history.push('/')
                alert('Error')
            }
        })
        .catch(error => {
            props.history.push('/')
            alert('Server Error: ', error)
        })
    }, [interviewID])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let resume = ""
        const files = e.target.uploadResume.files
        if(files.length > 0) resume = files[0]
        //console.log(resume);

        let formData = new FormData()

        formData.append("title", title)
        formData.append("start_time", startTime)
        formData.append("end_time", endTime)
        formData.append("participants", participants)
        formData.append("resume", resume)

        axios.put(`http://localhost:3001/interviews/${interviewID}`, formData,
        {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response);
            if(response.data.status === 'success'){
                alert('Interview Edited')
                props.history.push('/')
            }
            else if(response.data.status === 'error') alert(response.data.message);
            else alert('Error')
        })
        .catch(error => alert('Server Error: ', error))
    }

    return (
        <div className = "main-container">
            <div className = "main-link">
                <Link to = "/">All Interview</Link>
            </div>
            <form className = "form" onSubmit = {handleFormSubmit}>
                <div className = "form__field">
                    <label>Title:</label>
                    <input type = "text" value = {title} onChange = {(e) => setTitle(e.target.value)}/>
                </div>
                <div className = "form__field">
                    <label>Start time:</label>
                    <input type = "datetime-local" name = "start_time" value={startTime} onChange = {(e) => setStartTime(e.target.value)}/>
                </div>
                <div className = "form__field">
                    <label>End time:</label>
                    <input type = "datetime-local" name = "end_time" value={endTime} onChange = {(e) => setEndTime(e.target.value)}/>
                </div>
                <div className = "form__field">
                    <label>Participants:</label>
                    <input type = "text" value = {participants} onChange = {(e) => setParticipants(e.target.value)}/>
                </div>
                {
                    currentResume !== "" &&
                    <div className = "form__field">
                        <ExternalLink href = {`http://localhost:3001${currentResume}`}>View Current Resume</ExternalLink>
                    </div>
                }  
                <div className = "form__field">
                    <label>Update Resume:</label>
                    <input type = "file" id = "resume" name="uploadResume" />
                </div> 
                <div className = "form__field">
                    <button type = "submit">Edit Interview</button>
                </div>
            </form>
        </div>
    )
}

export default Interviewedit;