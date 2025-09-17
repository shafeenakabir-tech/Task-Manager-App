import React, {useState, useEffect} from 'react';
import TaskItem from './components/TaskItem.jsx';
import {fetchTasks, addTaskItem, deleteTaskItem} from './services/api.js';
import AddTaskItem from './components/AddTaskItem.jsx';
import {Container, Row, Col } from 'react-bootstrap';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { EditTaskItem } from './components/EditTaskItem.jsx';

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
const navigate = useNavigate();  
const handleSubmit = async(e) => {
  e.preventDefault();
  await addTask(taskData);
  setRefresh(!refresh);
  //handleReset();
  navigate('/');
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



if (loading) return <p>Loading tasks ..  </p>
if (error) return <p>Error : {error}</p>

return (
   <Routes>
        <Route path="/" element={
        <Container>
    <Row>
      <Col>
      <Row>
        <Col><h1>Task List</h1></Col>
        <Col>
        <Link to="/AddTaskItem">Add Task</Link>
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
          />)
      )}
      </Col>
    </Row>
     </Container>  }></Route> 
      <Route path="/AddTaskItem" element={<AddTaskItem handleSubmit={handleSubmit} 
       handleChange={handleChange}
        handleReset={handleReset}
        taskData={taskData} />}></Route>     
      <Route path="/EditTaskItem/:id" element={<EditTaskItem handleChange={handleChange}
          taskData={taskData}
          setTaskData={setTaskData}
          refresh={refresh}
          setRefresh={setRefresh}/>}  />     
   
     </Routes>  
);

}



export default App;