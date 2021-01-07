import React from 'react'
import { ExternalLink } from 'react-external-link';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { deleteInterview } from '../../actions/Interview'
import { connect } from 'react-redux';

function Interview({ id, title, start_time, end_time, participants, resume, dispatch }) {

    const handleInterviewDelete = (e) => {
        if (window.confirm('Are you sure you wish to delete this item?')){
            axios.delete(`http://localhost:3001/interviews/${id}`)
            .then(response => {
                console.log(response);
                if(response.data.status === 'success'){
                    dispatch(deleteInterview(id))
                }
                else alert('Error')
            })
            .catch(error => {console.log('Server Error: ', error)})
        }
    } 

    return (
        <div className = "interview__container">
            <div className = "interview__field">
                <h4>{title}</h4>
            </div>
            <div className = "interview__field">
                <p>Start Time: {start_time}</p>
            </div>
            <div className = "interview__field">
                <p>End Time: {end_time}</p>
            </div>
            <div className = "interview__field">
                <p>Participants: {participants}</p>
            </div>
            <div className = "interview__field">
                {
                    resume !== "" && <ExternalLink href = {`http://localhost:3001${resume}`}>View Resume</ExternalLink>
                }
                <Link to = {`/edit/${id}`}>Edit</Link>
                <button onClick = {handleInterviewDelete}>Delete</button>
            </div>
        </div>
    )
}

export default connect()(Interview)
