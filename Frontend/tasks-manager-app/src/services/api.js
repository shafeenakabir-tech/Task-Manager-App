
import axios from 'axios';
export async function fetchTasks(){
    const response = await fetch('https://localhost:44325/api/tasks');
    if(!response.ok)  {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export async function addTaskItem(taskData){
    const response = await axios.post('https://localhost:44325/api/tasks', taskData);
    if(!response.ok)  {
        throw new Error('Network response for add task was not ok');
    }
    return await response.json();
}