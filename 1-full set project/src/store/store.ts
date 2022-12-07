
import {combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "./todolist/todolists-reducer";
import {tasksReducer} from "./tasks/tasks_reducer";

const rootReducer =  combineReducers({
    todoLists:todoListsReducer,
        tasks:tasksReducer
})
export type AppRootStateType = ReturnType< typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store


