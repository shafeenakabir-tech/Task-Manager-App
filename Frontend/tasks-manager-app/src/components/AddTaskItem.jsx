import React from 'react';
import {Form, Label, Checkbox, Button } from '@fluentui/react-components';

function AddTaskItem({handleSubmit, handleChange}) {

return (
    <div className='add-task-item'>
        <h2>Add a Task</h2>
        <Form onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="title">Title</Label>
                <input type="text" id="title" name="title" required onChange={handleChange}/>                
            </div>
             <div>
                <Label htmlFor="description">Description</Label>
                <textarea id="description" name="description" required onChange={handleChange}/>                
            </div>
            <div>
                <Label htmlFor="isCompleted">Completed</Label>
                <Checkbox id="isCompleted" name="isCompleted" checked="false" onChange={handleChange} />
            </div>
            <Button type ="submit">Add Task</Button>
            <Button type="reset">Clear</Button>
        </Form>
    </div>
);
}

export default AddTaskItem;