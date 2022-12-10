
import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {

    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,

} from "./store/todolist/todolists-reducer";
import {

    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,

} from "./store/tasks/tasks_reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type TodoListType = {
    todoListId: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "completed" | "active"

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType,TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
const dispatch = useDispatch()

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    },[dispatch])
    const addTodoList = useCallback( (title: string) => {
     dispatch( addTodoListAC(title))
    },[dispatch])

    const changeTodoListFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(value, todoListId))
    },[dispatch])
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(newTitle, todoListId))
    },[dispatch])
    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    },[dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    },[dispatch])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    },[dispatch])
    const changeTaskTitle =useCallback( (id: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    },[dispatch])

    const TodolistComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.todoListId}>
                <Paper elevation={8}
                       style={{width: "270px", padding: '20px'}}>
                    <TodoList
                        title={tl.title}
                        todoListId={tl.todoListId}
                        tasks={tasks[tl.todoListId]}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    /></Paper>
            </Grid>)

    })
    return (
        <div className={'App'}>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {TodolistComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
