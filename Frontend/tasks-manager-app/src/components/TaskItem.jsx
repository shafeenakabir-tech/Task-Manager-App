import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function TaskItem( {task, handleDelete }) {
    return (
        <div className='task-item'>
            <h3>{task.title}</h3>
            <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
            <Button onClick={(e) => handleDelete(e, task.id)} variant="danger" 
            size="sm">Delete</Button>
            <Link to={`/EditTaskItem/${task.id}`}  >
            <Button variant="primary" size="sm">Edit</Button>
            </Link> 
        </div>
    )
}

export default TaskItem;