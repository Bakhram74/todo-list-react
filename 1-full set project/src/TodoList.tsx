import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import Button from "./components/Button";
import './App.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[],
    removeTask: (id: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}
export const TodoList = (props: TodoListType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState('')

    const TasksList = props.tasks.length ? props.tasks.map(t=>{
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        }
        const removeTaskHandler = () => {
            props.removeTask(t.id, props.todoListId)
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type='checkbox' onChange={changeTaskStatus}
                                                                        checked={t.isDone}/><span>{t.title}</span>
                <button onClick={removeTaskHandler}>
                    <span>✖️</span>
                </button>
            </li>
        )
    }) : <span>Your list is empty</span>
    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.todoListId)
            setTitle("")
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const inputErr = error ? 'error' : ""
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onButtonClickHandler = (filterValue: FilterValuesType) => () => props.changeTodoListFilter(filterValue, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>✖</button>
            </h3>
            <div><input value={title}
                        className={inputErr}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
            />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {TasksList}
            </ul>
                <div>
                    <button className={props.filter === 'all' ? 'all-bnt' : ''}
                            onClick={onButtonClickHandler('all')}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-bnt' : ''}
                            onClick={onButtonClickHandler('active')}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'completed-bnt' : ''}
                            onClick={onButtonClickHandler('completed')}>Completed
                    </button>
                </div>

        </div>
    )
}