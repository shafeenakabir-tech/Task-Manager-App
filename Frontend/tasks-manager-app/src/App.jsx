import React, {useState, useEffect} from 'react';
import TaskItem from './components/TaskItem.jsx';
import {fetchTasks, addTaskItem, deleteTaskItem} from './services/api.js';
import AddTaskItem from './components/AddTaskItem.jsx';
import {Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function App(){
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [refresh, setRefresh] = useState(false);
const [taskData, setTaskData] = useState({
  title : '',
  description : '',
  isCompleted : false,
  createdAt : new Date().toISOString(),
  completedAt : new Date().toISOString()
});
const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  setTaskData({
    ...taskData,
    [name]: type === 'checkbox' ? checked : value
  });   
}

const addTask = async (taskData) => {
  try{
    const newTask = await addTaskItem(taskData);
    setTasks([...tasks, newTask]);
  } catch (err) {
    setError(err.message);
  }
}

const deleteTask = async (i) => {
  try{
    await deleteTaskItem(i);
    // setTasks(tasks.filter(task => task.id !== i))
    setRefresh(!refresh);
  } catch (err) {
    setError(err.message);
  }
}
useEffect(() => {
 const getTasks = async () => {
  try {
    const data = await fetchTasks();
    setTasks(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
 };
  getTasks();

}, [refresh]);

const handleSubmit = async(e) => {
  e.preventDefault();
  addTask(taskData);
  handleReset();
}

const handleReset = () => {
  setTaskData({
    title : '',
    description : '',
    isCompleted : false,
    createdAt : new Date().toISOString(),
    completedAt : new Date().toISOString()
  });
}

const handleDelete = async(e, i) => {
  e.preventDefault(); 
  deleteTask(i);
}

const handleEdit = (e,i) => {
  e.preventDefault();
  editTask(i);

}

const navigate = useNavigate();
function editTask(taskId)
{
   navigate(`/EditTaskItem/${taskId}`);
}

if (loading) return <p>Loading tasks ..  </p>
if (error) return <p>Error : {error}</p>

return (
  <Container>
    <Row>
      <Col>
      <Row>
        <Col><h1>Task List</h1></Col>
        <Col>
        <AddTaskItem handleSubmit={handleSubmit} 
        handleChange={handleChange}
        handleReset={handleReset}
        taskData={taskData}></AddTaskItem>
        </Col>
      </Row>
     
      </Col>
    </Row>
    <Row>
      <Col>
       {tasks.length === 0 ? (
      <p> No tasks available</p>) : (
        tasks.map(task => <TaskItem key ={task.id} task={task} 
          handleDelete={handleDelete}
          handleEdit = {handleEdit} />)
      )}
      </Col>
    </Row>  
   
    </Container>
);

}



export default App;