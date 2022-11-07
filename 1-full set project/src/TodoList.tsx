import React, { ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import './App.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTaskTitle:(id: string, newTitle:string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle:(newTitle:string, todoListId: string)=>void
}
export const TodoList = (props: TodoListType) => {


    const TasksList = props.tasks.length ? props.tasks.map(t => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        }
        const removeTaskHandler = () => {
            props.removeTask(t.id, props.todoListId)
        }
        const changeTaskTitle = (newTitle:string)=> props.changeTaskTitle(t.id,newTitle,props.todoListId)

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type='checkbox' onChange={changeTaskStatus} checked={t.isDone}/>
                <EditableSpan changeTitle={changeTaskTitle} title={t.title}/>
                <button onClick={removeTaskHandler}>
                    <span>✖️</span>
                </button>
            </li>
        )
    }) : <span>Your list is empty</span>
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }


    const onChangeTodoListFilter = (filterValue: FilterValuesType) => () => props.changeTodoListFilter(filterValue, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (newTitle:string) => props.changeTodoListTitle(newTitle,props.todoListId)
    return (
        <div>
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} title={props.title}/>
                <button onClick={removeTodoList}>✖</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {TasksList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'all-bnt' : ''}
                        onClick={onChangeTodoListFilter('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-bnt' : ''}
                        onClick={onChangeTodoListFilter('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'completed-bnt' : ''}
                        onClick={onChangeTodoListFilter('completed')}>Completed
                </button>
            </div>

        </div>
    )
}