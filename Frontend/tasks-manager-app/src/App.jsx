import React, {useState, useEffect} from 'react';
import TaskItem from './components/TaskItem.jsx';
import {fetchTasks, addTaskItem} from './services/api.js';
import AddTaskItem from './components/AddTaskItem.jsx';
import {Container, Row, Col } from 'react-bootstrap';

function App(){
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [taskData, setTaskData] = useState({
  title : '',
  description : '',
  isCompleted : false,
  createdAt : new Date().toISOString(),
  completedAt : new Date().toISOString()
});
const handleChange = (e) => {
    setTaskData({...taskData, [e.target.name]: e.target.value});    
}

const addTask = async (taskData) => {
  try{
    const newTask = await addTaskItem(taskData);
    setTasks([...tasks, newTask]);
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

}, []);

const handleSubmit = async(e) => {
  e.preventDefault();
  addTask(taskData);
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
        <AddTaskItem handleSubmit={handleSubmit} handleChange={handleChange}></AddTaskItem>
        </Col>
      </Row>
     
      </Col>
    </Row>
    <Row>
      <Col>
       {tasks.length === 0 ? (
      <p> No tasks available</p>) : (
        tasks.map(task => <TaskItem key ={task.id} task={task} />)
      )}
      </Col>
    </Row>  
   
    </Container>
);

}



export default App;