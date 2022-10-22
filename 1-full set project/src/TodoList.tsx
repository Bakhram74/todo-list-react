import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import Button from "./components/Button";
import './App.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter:FilterValuesType
}
export const TodoList = (props: TodoListType) => {

    const [title, setTitle] = useState("")
    const [error,setError] = useState('')

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    const mapTasks = props.tasks.map(t => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type='checkbox' onChange={changeStatus}
                                  checked={t.isDone}/><span>{t.title}</span>
                <button onClick={() => removeTaskHandler(t.id)}>
                    <span>✖️</span>
                </button>
            </li>
        )
    })
    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")
        }else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error){
            setError('')
        }
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
const inputErr = error ? 'error': ""
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div><input value={title}
                        className={inputErr}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
            />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {mapTasks}
                <div>
                    <button className={props.filter === 'all' ? 'all-bnt' : ''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-bnt' : ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? 'completed-bnt' : ''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </ul>
        </div>
    )
}