import React from 'react';
import { Button } from 'react-bootstrap';
function TaskItem( {task, handleDelete }) {
    return (
        <div className='task-item'>
            <h3>{task.title}</h3>
            <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
            <Button onClick={(e) => handleDelete(e, task.id)} variant="danger" 
            size="sm">Delete</Button>
            <Button onClick={(e) => handleEdit(e, task.id)} variant="primary"
            size="sm">Edit</Button>
        </div>
    )
}

export default TaskItem;