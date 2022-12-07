import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import './App.css'
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {HighlightOffTwoTone} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TasksStateType, TodoListType} from "./AppSimple";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks/tasks_reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./store/todolist/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListSimplePropsType = {
    todoLists:TodoListType
}

export const TodoListSimple = (props: TodoListSimplePropsType) => {

    const {todoListId, title, filter} = props.todoLists

    let tasks = useSelector<AppRootStateType,TaskType[]>(state => state.tasks[todoListId])
    const dispatch = useDispatch()
    if (filter === 'active') {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone === true)
    }
    const TasksList = tasks.length ? tasks.map(t => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked,todoListId))
        }
        const removeTaskHandler = () => {
            dispatch(removeTaskAC(t.id,todoListId))
        }
        const changeTaskTitle = (newTitle: string) => dispatch(changeTaskTitleAC(t.id, newTitle,todoListId))

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
        dispatch(addTaskAC(title,todoListId))
    }
    const onChangeTodoListFilter = (filterValue: FilterValuesType) => () =>
        dispatch(changeTodoListFilterAC(filterValue,todoListId))

    const removeTodoList = () => dispatch(removeTodoListAC(todoListId))
    const changeTodoListTitle = (newTitle: string) => dispatch(changeTodoListTitleAC(newTitle,todoListId))
    return (
        <div style={{width: "250px"}}>
            <Typography variant={'h5'} style={{paddingBottom:'20px'}} fontWeight={600} color={"primary"}>
                <EditableSpan changeTitle={changeTodoListTitle} title={title}/>
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
                            color={filter === 'all' ? 'secondary' : "primary"}
                            onClick={onChangeTodoListFilter('all')}>All
                    </Button>
                    <Button style={{fontSize: "11px"}} color={filter === 'completed' ? 'secondary' : "primary"}
                            onClick={onChangeTodoListFilter('completed')}>Completed
                    </Button>
                    <Button style={{marginRight: "1px", fontSize: "12px"}}
                            color={filter === 'active' ? 'secondary' : "primary"}
                            onClick={onChangeTodoListFilter('active')}>Active
                    </Button>
                </ButtonGroup>
            </div>

        </div>
    )
}