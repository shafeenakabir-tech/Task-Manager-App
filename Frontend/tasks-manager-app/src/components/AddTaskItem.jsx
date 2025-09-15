import React from 'react';
import { Form, Button } from 'react-bootstrap';

function AddTaskItem({ handleSubmit, handleChange, taskData, handleReset }) {

return (
    <div className='add-task-item'>
        <h2>Add a Task</h2>
        <Form onSubmit={handleSubmit} onReset={handleReset}>
             <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control type="text" id="title" name="title" required onChange={handleChange}  value={taskData.title} />                
            </Form.Group>
             <Form.Group>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control as="textarea" id="description" name="description" required onChange={handleChange} value={taskData.description} />                
            </Form.Group>
            <Form.Group>                
                <Form.Check type="checkbox" id="isCompleted" name="isCompleted" label="Completed"
                 checked={taskData.isCompleted}
            onChange={handleChange}  />
            </Form.Group>
        <Button type="submit">Add Task</Button>{' '}
        <Button type="reset" variant="secondary">Clear</Button>
        </Form>
    </div>
);
}

export default AddTaskItem;