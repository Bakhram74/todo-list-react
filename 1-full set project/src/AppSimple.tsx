import React from 'react';
import './App.css';
import {TaskType} from "./TodoList";

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
import {TodoListSimple} from "./TodoListSimple";


export type TodoListType = {
    todoListId: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "completed" | "active"

function AppSimple() {
    const todoLists = useSelector<AppRootStateType,TodoListType[]>(state => state.todoLists)
const dispatch = useDispatch()

    const addTodoList = (title: string) => {
     dispatch( addTodoListAC(title))

    }


    //
    // const getFilteredTasks = (t: TaskType[], f: FilterValuesType) => {
    //     let tasksForTodoList = t
    //     if (f === 'active') {
    //         tasksForTodoList = t.filter(t => !t.isDone)
    //     }
    //     if (f === 'completed') {
    //         tasksForTodoList = t.filter(t => t.isDone)
    //     }
    //     return tasksForTodoList
    // }
    const TodolistComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.todoListId}>
                <Paper elevation={8}
                       style={{width: "270px", padding: '20px'}}>
                    <TodoListSimple
                        todoLists={tl}
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

export default AppSimple;
