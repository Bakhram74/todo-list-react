import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import './App.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {HighlightOffTwoTone} from "@mui/icons-material";

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
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}
export const TodoList = (props: TodoListType) => {

    const TasksList = props.tasks.length ? props.tasks.map(t => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        }
        const removeTaskHandler = () => {
            props.removeTask(t.id, props.todoListId)
        }
        const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(t.id, newTitle, props.todoListId)

        return (
            <ListItem style={{
                padding: "0px",
                justifyContent: "space-between",
                textDecoration: t.isDone ? "line-through" : "none"
            }}
                      key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox size={'small'} onChange={changeTaskStatus} checked={t.isDone}></Checkbox>
                <EditableSpan changeTitle={changeTaskTitle} title={t.title}/>
                <IconButton style={{padding: "0px"}} onClick={removeTaskHandler}>
                    <span><HighlightOffTwoTone/>️</span>
                </IconButton>
            </ListItem>
        )
    }) : <span>Your list is empty</span>
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }


    const onChangeTodoListFilter = (filterValue: FilterValuesType) => () => props.changeTodoListFilter(filterValue, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.todoListId)
    return (
        <div style={{width: "250px"}}>
            <Typography variant={'h5'} style={{paddingBottom:'20px'}} fontWeight={600} color={"primary"}>
                <EditableSpan changeTitle={changeTodoListTitle} title={props.title}/>
                <IconButton style={{padding: "0px"}} size={'small'} onClick={removeTodoList} color={'secondary'}>
                    <span><HighlightOffTwoTone/>️</span>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTaskHandler}/>
            <List>
                {TasksList}
            </List>
            <div>
                <ButtonGroup variant={"contained"} size={'small'} fullWidth>
                    <Button style={{marginRight: "1px", fontSize: "12px"}}
                            color={props.filter === 'all' ? 'secondary' : "primary"}
                            onClick={onChangeTodoListFilter('all')}>All
                    </Button>
                    <Button style={{fontSize: "11px"}} color={props.filter === 'completed' ? 'secondary' : "primary"}
                            onClick={onChangeTodoListFilter('completed')}>Completed
                    </Button>
                    <Button style={{marginRight: "1px", fontSize: "12px"}}
                            color={props.filter === 'active' ? 'secondary' : "primary"}
                            onClick={onChangeTodoListFilter('active')}>Active
                    </Button>
                </ButtonGroup>
            </div>

        </div>
    )
}