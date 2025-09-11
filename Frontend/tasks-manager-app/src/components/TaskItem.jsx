import React from 'react';
function TaskItem( {task}) {
    return (
        <div className='task-item'>
            <h3>{task.title}</h3>
            <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
        </div>
    )
}

export default TaskItem;