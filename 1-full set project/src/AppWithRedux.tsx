export {}
// import React from 'react';
// import './App.css';
// import {TaskType, TodoList} from "./TodoList";
//
// import AddItemForm from "./components/AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import {Menu} from "@mui/icons-material";
// import {
//
//     addTodoListAC,
//     changeTodoListFilterAC,
//     changeTodoListTitleAC,
//     removeTodoListAC,
//
// } from "./store/todolist/todolists-reducer";
// import {
//
//     addTaskAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
//
// } from "./store/tasks/tasks_reducer";
// import {useDispatch, useSelector} from "react-redux";
// import {AppRootStateType} from "./store/store";
//
//
// export type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [todolistId: string]: Array<TaskType>
// }
// export type FilterValuesType = "all" | "completed" | "active"
//
// function AppWithRedux() {
//     const todoLists = useSelector<AppRootStateType,TodoListType[]>(state => state.todoLists)
//     const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
// const dispatch = useDispatch()
//
//     const removeTodoList = (todoListId: string) => {
//         dispatch(removeTodoListAC(todoListId))
//     }
//     const addTodoList = (title: string) => {
//      dispatch( addTodoListAC(title))
//
//     }
//     const changeTodoListFilter = (value: FilterValuesType, todoListId: string) => {
//         dispatch(changeTodoListFilterAC(value, todoListId))
//     }
//     const changeTodoListTitle = (newTitle: string, todoListId: string) => {
//         dispatch(changeTodoListTitleAC(newTitle, todoListId))
//     }
//     const removeTask = (id: string, todoListId: string) => {
//         dispatch(removeTaskAC(id, todoListId))
//     }
//     const addTask = (title: string, todoListId: string) => {
//         dispatch(addTaskAC(title, todoListId))
//     }
//
//     const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
//         dispatch(changeTaskStatusAC(id, isDone, todoListId))
//     }
//     const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
//         dispatch(changeTaskTitleAC(id, newTitle, todoListId))
//     }
//     const getFilteredTasks = (t: TaskType[], f: FilterValuesType) => {
//         let tasksForTodoList = t
//         if (f === 'active') {
//             tasksForTodoList = t.filter(t => !t.isDone)
//         }
//         if (f === 'completed') {
//             tasksForTodoList = t.filter(t => t.isDone)
//         }
//         return tasksForTodoList
//     }
//     const TodolistComponents = todoLists.map(tl => {
//         return (
//             <Grid item key={tl.id}>
//                 <Paper elevation={8}
//                        style={{width: "270px", padding: '20px'}}>
//                     <TodoList
//                         title={tl.title}
//                         todoListId={tl.id}
//                         tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
//                         removeTask={removeTask}
//                         changeTodoListFilter={changeTodoListFilter}
//                         addTask={addTask}
//                         changeTaskStatus={changeTaskStatus}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodoListTitle={changeTodoListTitle}
//                         filter={tl.filter}
//                         removeTodoList={removeTodoList}
//                     /></Paper>
//             </Grid>)
//
//     })
//     return (
//         <div className={'App'}>
//             <AppBar position={'static'}>
//                 <Toolbar style={{justifyContent: "space-between"}}>
//                     <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant={"h6"}>
//                         Todolists
//                     </Typography>
//                     <Button color={"inherit"} variant={"outlined"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {TodolistComponents}
//                 </Grid>
//             </Container>
//         </div>
//     )
// }
//
// export default AppWithRedux;
