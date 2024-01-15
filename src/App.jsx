import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskTab from './components/TaskTab.jsx'

import './components/TaskTab.css'
import './App.css'

import axios from 'axios';


      
function DisplayTasks({list}){
  console.log(list);
  return (
    <div>
      {list.map((item) => (
        <TaskTab task={item.task} stat={item.status} iden={item._id}/>
      ))}
    </div>
  );
}
    
              
  


function App() {
  const [taskList,getTaskList] = useState(null);/// this list of the get method to get all the tasks
  const [taskText, addBar] = useState("")/// this is used to get the add new task from input and then send to add api
   const getTaskData = () => {
     axios
    .get("http://localhost:8000/tasks")
    .then(data => {
                    getTaskList(data.data)})
    .catch(error => console.log(error));
    };
    
 useEffect(getTaskData,[])

console.log(taskList);

  
  
  
  
  
  function handleAdd(){
    console.log(taskText+" added");
    const addTaskData = () => {
      axios.post("http://localhost:8000/add",{"task":taskText}).then((p)=>{location.reload()})
      
    }
  addTaskData();   
  //getTaskData();   

  }
  

  const ListItems = (list)=>{
    console.log(list);
    return (
      <div>
        {list.map((item) => (
          <TaskTab task={item.task} stat={item.status} iden={item._id}/>
        ))}
      </div>
    );
  }


  
  const testList =[{task:"task start"},{task:"task end"}];

  return (
    <>
      <div id="TodoContainer">
        <h3>Todo App</h3>
        <input type="text"  placeholder='Enter your task' onChange={(e)=>{addBar(e.target.value);/*console.log(taskText)*/}} />
        
        <button onClick={handleAdd}>ADD</button>
        <div>task: {taskText}</div>
        {/* <div>
          <TaskTab task={"study"} />
          <TaskTab task={"test"}  />
        </div> */}
        {/* {ListItems(taskList!=null?taskList:testList)} */}
        <DisplayTasks list={taskList!=null?taskList:testList}/>
        
      </div>
    </>
  )
}

export default App
