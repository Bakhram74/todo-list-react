import React, {ChangeEvent, FC, useState} from 'react';
type EditableSpanPropsType = {
    title:string
    changeTitle:(newTitle:string) =>void
}
const EditableSpan:FC<EditableSpanPropsType> = (props,) => {
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
        ? <input onChange={onChangeHandler} autoFocus onBlur={offIsEditMode} value={title}/>
         :   <span onDoubleClick={onIsEditMode}>{props.title}</span>

    );
};

export default EditableSpan;