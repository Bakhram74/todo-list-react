import AddItemForm from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {AddCircleTwoTone} from "@mui/icons-material";

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        },
    },
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({})
AddItemFormStory.args = {
    addItem:action('Button clicked')
}

 const TemplateWithError : ComponentStory<typeof AddItemForm> = (args)=> {
    const [title, setTitle] = useState("")
    const [error, setError] = useState("Title is required")
    const inputErr = error ? 'error' : ""
    const addItemHandler = () => {
        if (title.trim() !== "") {
            args.addItem(title.trim())
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
        </div>
    );
}

export const AddItemFormWithError = TemplateWithError.bind({})
