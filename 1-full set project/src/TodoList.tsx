import React from "react";
type TaskType = {
    id:number
    title:string
    isDone:boolean
}
type TodoListType = {
    title:string
    tasks:TaskType[]
}
export const TodoList = (props:TodoListType)=>{
    return(
        <div>
            <h3>{props.title}</h3>
           <div><input/><button>+</button></div>
            <ul>
                <li><input type='checkbox' checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type='checkbox' checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </ul>
        </div>
    )
}