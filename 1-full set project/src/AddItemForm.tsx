import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddCircleTwoTone} from "@mui/icons-material";
type AddItemFormPropsType = {
    addItem:(title:string)=>void
}
const AddItemForm = (props:AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const inputErr = error ? 'error' : ""
    const addItemHandler = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div><TextField value={title}
                    className={inputErr}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                        size={'small'}
                        label={"title"}
                        error={!!error}
                        helperText={error && "Title is required"}
        />
            <IconButton color={'primary'} onClick={addItemHandler}><AddCircleTwoTone/></IconButton>
            {error && <div className={'error-message'}>
                {/*{error}*/}
            </div>}
        </div>
    );
};

export default AddItemForm;
