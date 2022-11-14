import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "completed" | "active"

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ])
    const [tasks, setTask] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Golang", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Honey", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Buckwheat", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
        ]
    })

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }
    const changeTodoListFilter = (value: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, filter: value} : t))
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, title: newTitle} : t))
    }
    const removeTask = (id: string, todoListId: string) => {
        const copies = {...tasks}
        copies[todoListId] = copies[todoListId].filter(t => t.id !== id)
        setTask(copies)
    }
    const addTask = (title: string, todoListId: string) => {
        let newTitle = {id: v1(), title: title, isDone: false}
        setTask({...tasks, [todoListId]: [newTitle, ...tasks[todoListId]]})
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTask({...tasks, [newTodoListId]: []})
    }
    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        setTask({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, isDone: isDone} : {...t})})
    }
    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        setTask({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, title: newTitle} : {...t})})
    }
    const getFilteredTasks = (t: TaskType[], f: FilterValuesType) => {
        let tasksForTodoList = t
        if (f === 'active') {
            tasksForTodoList = t.filter(t => !t.isDone)
        }
        if (f === 'completed') {
            tasksForTodoList = t.filter(t => t.isDone)
        }
        return tasksForTodoList
    }
    const TodolistComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8}
                       style={{width: "270px", padding: '20px'}}>
                    <TodoList
                        title={tl.title}
                        todoListId={tl.id}
                        tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
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

export default App;
