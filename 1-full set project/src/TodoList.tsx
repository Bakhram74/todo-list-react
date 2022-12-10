import React, {ChangeEvent, memo, useCallback} from "react";

import './App.css'
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {HighlightOffTwoTone} from "@mui/icons-material";
import {FilterValuesType} from "./AppWithRedux";
import Task from "./components/Task";

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
export const TodoList = memo((props: TodoListType) => {
    console.log("Todolist called")

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }
    const changeTaskStatus = useCallback((id: string, isDone: boolean) => {
        props.changeTaskStatus(id, isDone, props.todoListId)
    },[])
    const removeTask = useCallback((id: string) => {
        props.removeTask(id, props.todoListId)
    },[])
    const changeTaskTitle = useCallback((id: string, newTitle: string) => props.changeTaskTitle(id, newTitle, props.todoListId),[])
    const TasksList = tasksForTodoList.length ? tasksForTodoList.map(t => {
        // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        //     props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        // }
        // const removeTaskHandler = () => {
        //     props.removeTask(t.id, props.todoListId)
        // }
        // const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(t.id, newTitle, props.todoListId)

        return (
            <Task key={t.id} task={t} removeTask={removeTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
            // <ListItem style={{
            //     padding: "0px",
            //     justifyContent: "space-between",
            //     textDecoration: t.isDone ? "line-through" : "none"
            // }}
            //           key={t.id} className={t.isDone ? 'is-done' : ''}>
            //     <Checkbox size={'small'} onChange={changeTaskStatus} checked={t.isDone}></Checkbox>
            //     <EditableSpan changeTitle={changeTaskTitle} title={t.title}/>
            //     <IconButton style={{padding: "0px"}} onClick={removeTaskHandler}>
            //         <span><HighlightOffTwoTone/>️</span>
            //     </IconButton>
            // </ListItem>
        )
    }) : <span>Your list is empty</span>
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    },[props.addTask,props.todoListId])


    const onChangeAllTodoListFilter = useCallback(
        () => props.changeTodoListFilter('all', props.todoListId),[])
    const onChangeCompletedTodoListFilter = useCallback(
        () => props.changeTodoListFilter('completed', props.todoListId),[])
    const onChangeActiveTodoListFilter = useCallback(
        () => props.changeTodoListFilter('active', props.todoListId),[])

    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodoListTitle(newTitle, props.todoListId),[])
    return (
        <div style={{width: "250px"}}>
            <Typography variant={'h5'} style={{paddingBottom: '20px'}} fontWeight={600} color={"primary"}>
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
                <ButtonWithMemo style={{marginRight: "1px", fontSize: "12px"}}
                                color={props.filter === 'all' ? 'secondary' : "primary"}
                                onChangeTodoListFilter={onChangeAllTodoListFilter} title={"All"}/>
                <ButtonWithMemo style={{fontSize: "11px"}}
                                color={props.filter === 'completed' ? 'secondary' : "primary"}
                                onChangeTodoListFilter={onChangeCompletedTodoListFilter} title={"Completed"}/>
                <ButtonWithMemo style={{marginRight: "1px", fontSize: "12px"}}
                        color={props.filter === 'active' ? 'secondary' : "primary"}
                                onChangeTodoListFilter={onChangeActiveTodoListFilter}  title={'Active'}/>

            </div>

        </div>
    )
})

type ButtonWithMemoPropsType = {
    style:{
        marginRight?: string, fontSize: string
    },
    onChangeTodoListFilter:()=>void,
    color:'secondary' | "primary"
    title:string
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return (
            <Button variant={"contained"} style={props.style} color={props.color} onClick={props.onChangeTodoListFilter}>
                {props.title}
            </Button>
    )
})