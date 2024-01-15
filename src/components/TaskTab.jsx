import axios from 'axios';
import { useEffect, useState } from 'react';

function checkBox({status}){

    return(
        <div>
        <input type="checkbox"  name="TaskStatus" value="false"
                 checked={status} />
                 </div>
                 
    );
}

export default function TaskTab({task,stat,iden}){

    const [status, setStat] = useState(stat);

    useEffect(()=>{console.log("use effect triggered");stat=status;},[status])
    console.log(status);
    function handleDelete (){
        console.log("delete clicked");

        const deleteTask = ()=>{
            axios.post("http://localhost:8000/delete",{"task":task}).then((p)=>{location.reload()})
            console.log(task+ "deleted");
      
    }
            deleteTask();
    }
    function handleCheck(e){
        //console.log("check box click" +e);
        
        setStat(e.target.checked);
        axios.post("http://localhost:8000/update",{"filter":{"task":task},
                                                     "update":{"status":e.target.checked}}).then((p)=>{location.reload()})
    }
    console.log(task)

    return (
        <div id="taskTab" style={{"display":"flex"}}>
            
            <input type="checkbox" onClick={handleCheck}  name="TaskStatus" 
                  checked={stat}/>
                
            <span style={(stat)?{textDecoration:"line-through"}:{}}>{task}</span>
            <button onClick={handleDelete} >Delete</button>

        </div>

    )
}