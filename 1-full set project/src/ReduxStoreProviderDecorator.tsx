import {Provider} from "react-redux";
import React, {ReactNode} from "react";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./store/tasks/tasks_reducer";
import {todoListsReducer} from "./store/todolist/todolists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "./store/store";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})
const initialGlobalState = {
    todoLists: [
        {todoListId: 'todolistId1', title: 'What to learn', filter: 'all'},
        {todoListId: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

const storyBookStore = legacy_createStore(rootReducer,initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn:()=>ReactNode)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}