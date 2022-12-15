import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "../todolist/todolists-reducer";


type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export type ActionsType =
    RemoveTaskAT |
    AddTaskAT |
    ChangeTaskStatusAT|
    ChangeTaskTitleAT|
    AddTodoListAT|
    RemoveTodoListAT

const initialState:TasksStateType = {}

export const tasksReducer = (state=initialState , action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.taskTitle, isDone: false}
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? ({...t, title:action.title}) : t)
            }
        }
        case "ADD-TODOLIST":{
            return {...state,[action.todoListId]:[]}
        }
        case "REMOVE-TODOLIST":{
              delete state[action.todoListId]
            return state
        }
        default:
         return   state

    }

}

export const removeTaskAC = (taskId: string, todoListId: string) => ({
    type: 'REMOVE-TASK',
    taskId,
    todoListId
}) as const

export const addTaskAC = (taskTitle: string, todoListId: string) => ({
    type: 'ADD-TASK',
    taskTitle,
    todoListId
}) as const

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todoListId
}) as const
export const changeTaskTitleAC=(taskId: string, title:string, todoListId: string) =>({
    type:'CHANGE-TASK-TITLE',
    taskId,
    title,
    todoListId
})as const