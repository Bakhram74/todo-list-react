import Task from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React, {ChangeEvent, useState} from "react";
import {TaskType} from "../../TodoList";
import {action} from "@storybook/addon-actions";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import EditableSpan from "../editable-span/EditableSpan";
import {HighlightOffTwoTone} from "@mui/icons-material";


export default {
    title: 'TodoList/Task',
    component: Task,
    args:{
        removeTask: action('removeTask'),
      changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneStory = Template.bind({})

TaskIsDoneStory.args = {
    task: {id: 'qwerty', title: 'JAVA', isDone: true},
}

export const TaskIsNotDoneStory = Template.bind({})

TaskIsNotDoneStory.args = {
    task: {id: 'qwerty', title: 'GO', isDone: false},
}

const TemplateWork: ComponentStory<typeof Task> = (args) => {

    const[task,setTask] = useState<TaskType>({id:'20',title:'GRPC',isDone:false})

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({...task,isDone:e.currentTarget.checked})
    }
    const removeTaskHandler = () => {
      args.removeTask(task.id)
    }
    const changeTaskTitleHandler = (newTitle: string) => setTask({...task,title:newTitle})

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

}
export const TemplateWorkStory = TemplateWork.bind({})