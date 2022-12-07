import React, {Reducer, useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    ActionTodoListType,
    addTodoListAC,
    changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./store/todolist/todolists-reducer";
import {
    ActionsType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./store/tasks/tasks_reducer";

export type TodoListType = {
    todoListId: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "completed" | "active"

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer<Reducer<TodoListType[], ActionTodoListType>>(todoListsReducer, [
        {todoListId: todoListId_1, title: "What to learn", filter: 'all'},
        {todoListId: todoListId_2, title: "What to buy", filter: 'all'}
    ])
    const [tasks, dispatchTask] = useReducer<Reducer<TasksStateType, ActionsType>>(tasksReducer, {
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
        const action = removeTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchTask(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchTask(action)
        dispatchTodoLists(action)
    }
    const changeTodoListFilter = (value: FilterValuesType, todoListId: string) => {
        dispatchTodoLists(changeTodoListFilterAC(value, todoListId))
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatchTodoLists(changeTodoListTitleAC(newTitle, todoListId))
    }
    const removeTask = (id: string, todoListId: string) => {
        dispatchTask(removeTaskAC(id, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchTask(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatchTask(changeTaskStatusAC(id, isDone, todoListId))
    }
    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        dispatchTask(changeTaskTitleAC(id, newTitle, todoListId))
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
            <Grid item key={tl.todoListId}>
                <Paper elevation={8}
                       style={{width: "270px", padding: '20px'}}>
                    <TodoList
                        title={tl.title}
                        todoListId={tl.todoListId}
                        tasks={getFilteredTasks(tasks[tl.todoListId], tl.filter)}
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
