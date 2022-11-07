import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
        <div><input value={title}
                    className={inputErr}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
        />
            <button onClick={addItemHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;