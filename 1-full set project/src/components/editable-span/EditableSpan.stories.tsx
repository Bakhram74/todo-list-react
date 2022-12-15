import EditableSpan from "./EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React, {ChangeEvent, useState} from "react";
import {action} from "@storybook/addon-actions";
import {TextField} from "@mui/material";


export default {
    title:'todoList/EditableSpan',
    component:EditableSpan,
    args:{
        title:"Golang",
        changeTitle:action('changeTitle')
    }
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args)=> {
    const [isEditMode,setEditMode] = useState<boolean>(false)
    const [title,setTitle] = useState(args.title)

    const onIsEditMode = ()=>{
        setEditMode(true)
    }
    const offIsEditMode = ()=>{
        setEditMode(false)
       args.changeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode
            ? <TextField
                onChange={onChangeHandler}
                autoFocus onBlur={offIsEditMode}
                value={title}
                variant="standard"/>

            :   <span onDoubleClick={onIsEditMode}>{title}</span>

    );
}
export const EditableSpanStory = Template.bind({})