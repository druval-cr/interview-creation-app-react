import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import '../../styles/InterviewCreate/InterviewCreate.css'

export default function Interviewcreate(props) {

    const [title, setTitle] = useState('')
    const [participants, setParticipants] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let resume = ""
        const files = e.target.uploadResume.files
        if(files.length > 0) resume = files[0]
        //console.log(resume);

        let formData = new FormData()

        formData.append("title", title)
        formData.append("start_time", e.target.start_time.value)
        formData.append("end_time", e.target.end_time.value)
        formData.append("participants", participants)
        formData.append("resume", resume)

        axios.post("http://localhost:3001/interviews", formData,
        {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response);
            if(response.data.status === 'success'){
                alert('Interview Created')
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
                    <input type = "datetime-local" name = "start_time"/>
                </div>
                <div className = "form__field">
                    <label>End time:</label>
                    <input type = "datetime-local" name = "end_time"/>
                </div>
                <div className = "form__field">
                    <label>Participants:</label>
                    <input type = "text" value = {participants} onChange = {(e) => setParticipants(e.target.value)}/>
                </div>
                <div className = "form__field">
                    <label>Resume:</label>
                    <input type = "file" id = "resume" name="uploadResume" />
                </div>
                
                <div className = "form__field">
                    <button type = "submit">Create Interview</button>
                </div>
            </form>
        </div>
    )
}
