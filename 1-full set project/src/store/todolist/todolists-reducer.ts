import {FilterValuesType, TodoListType} from "../../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    todoListId: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId:string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filterValue: FilterValuesType,
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type:'CHANGE-TODOLIST-TITLE',
    newTitle: string,
    todoListId: string
}

type ActionTodoListType =
    RemoveTodoListAT |
    AddTodoListAT |
    ChangeTodoListFilterAT|
    ChangeTodoListTitleAT
    // AddTodolistAT

export const todoListsReducer = (todoLists: TodoListType[], action: ActionTodoListType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return todoLists.filter(t => t.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return ([newTodoList, ...todoLists])
        }
        case "CHANGE-TODOLIST-FILTER": {
         return todoLists.map(t => t.id === action.todoListId ? {...t, filter: action.filterValue} : t)
        }
        case "CHANGE-TODOLIST-TITLE":{
            return todoLists.map(t => t.id === action.todoListId ? {...t, title: action.newTitle} : t)
        }
        default:
            return todoLists

    }

}

export const removeTodoListAC = (todoListId: string) : RemoveTodoListAT=>({
    type: 'REMOVE-TODOLIST',
    todoListId: todoListId
})

export const  addTodoListAC =(title: string):AddTodoListAT =>({
    type: 'ADD-TODOLIST',
    title: title,
    todoListId: v1()
})

export const changeTodoListFilterAC =(filterValue: FilterValuesType, todoListId: string):ChangeTodoListFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filterValue: filterValue,
    todoListId: todoListId
})

export const changeTodoListTitleAC =(newTitle: string, todoListId: string):ChangeTodoListTitleAT => ({
    type:'CHANGE-TODOLIST-TITLE',
    newTitle: newTitle,
    todoListId: todoListId
})