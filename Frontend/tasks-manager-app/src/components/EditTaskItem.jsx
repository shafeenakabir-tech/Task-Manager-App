
import React, { useState, useEffect } from 'react';
import { fetchTaskById, editTaskItem } from '../services/api.js';
import  { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const EditTaskItem = ({ handleChange, taskData, setTaskData, refresh, setRefresh}) => {
    let params = useParams();
    const key = params.id;   

    useEffect(() => {
        const getTaskById = async () =>{
            try{
                const data = await fetchTaskById(key);
                setTaskData(data);
            }
            catch(err){
                console.log(err.message);
            }
        }
        getTaskById();

    }, []);
    const navigate = useNavigate();    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await editTaskItem(key, taskData);
            setRefresh(!refresh);
            navigate(`/`);
        }
        catch(err){
            console.log(err.message);
        }       

    }

    return (
        <div>
            <div> Edit Task </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control type="text" id="title" name="title"
                    required value={taskData.title} 
                    onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control as="textarea" id="description" name="description"
                    required value={taskData.description}
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" id="isCompleted"
                    name="isCompleted" label="Completed" checked={taskData.isCompleted}
                    onChange={handleChange}/>
                </Form.Group>
                <Button type="submit">Update Task</Button> 
                               
            </Form>
        </div>
       
       
        
    )
}
export default EditTaskItem;

