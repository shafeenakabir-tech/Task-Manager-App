
import axios from 'axios';
export async function fetchTasks(){
    const response = await fetch('http://localhost:5145/api/tasks');
    if(!response.ok)  {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export async function addTaskItem(taskData){
    const response = await axios.post('http://localhost:5145/api/tasks', taskData);
  /* if(!response.ok)  {
        throw new Error('Network response for add task was not ok');
    }*/
    return response.data;
}

export async function deleteTaskItem(id){
    const response = await axios.delete('http://localhost:5145/api/tasks/{id}'.replace('{id}', id));
  /* if(!response.ok)  {
        throw new Error('Network response for add task was not ok');
    }*/
    return response.data;
}