import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {HighlightOffTwoTone} from "@mui/icons-material";
import {TaskType} from "../TodoList";

type TaskPropsType = {
    task:TaskType
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, newTitle: string) => void
}

const Task = memo(({task,removeTask,changeTaskStatus,changeTaskTitle}:TaskPropsType) => {

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }
    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(task.id, newTitle)

    return (
        <ListItem style={{
            padding: "0px",
            justifyContent: "space-between",
            textDecoration: task.isDone ? "line-through" : "none"
        }}
                  key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox size={'small'} onChange={changeTaskStatusHandler} checked={task.isDone}></Checkbox>
            <EditableSpan changeTitle={changeTaskTitleHandler} title={task.title}/>
            <IconButton style={{padding: "0px"}} onClick={removeTaskHandler}>
                <span><HighlightOffTwoTone/>️</span>
            </IconButton>
        </ListItem>
    );
});

export default Task;