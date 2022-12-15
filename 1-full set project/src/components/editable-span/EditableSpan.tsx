import React, {ChangeEvent, FC, memo, useState} from 'react';
import {TextField} from "@mui/material";
type EditableSpanPropsType = {
    title:string
    changeTitle:(newTitle:string) =>void
}
const EditableSpan:FC<EditableSpanPropsType> = memo( (props) => {
    const [isEditMode,setEditMode] = useState<boolean>(false)
    const [title,setTitle] = useState(props.title)
   const onIsEditMode = ()=>{
        setEditMode(true)
   }
    const offIsEditMode = ()=>{
        setEditMode(false)
        props.changeTitle(title)
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

         :   <span onDoubleClick={onIsEditMode}>{props.title}</span>

    );
});

export default EditableSpan;