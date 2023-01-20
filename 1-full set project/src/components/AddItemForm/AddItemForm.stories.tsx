import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import React from "react";


export default {
    title: 'AddItemForm',
    component: AddItemForm,
};

const callBack = action("for test")
export const BaseExample = ()=> <AddItemForm addItem={callBack}/>