import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    const [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodoList = tasks

    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeTask = (id: string) => {
        setTask(tasks.filter(task => task.id !== id))
    }

    const addTask = (title: string) => {
        let newTitle = {id: v1(), title: title, isDone: false}
        setTask([newTitle, ...tasks])

    }

    const changeStatus = (id:string,isDone:boolean)=>{
        tasks.map(t=> t.id === id ? t.isDone = isDone : t.isDone )

        setTask([...tasks])
    }
    return (
        <div className={'App'}>
            <TodoList title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>

    )
}

export default App;
