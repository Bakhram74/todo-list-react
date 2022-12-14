import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC,} from '../../app/app-reducer'
import {fetchTasksTC} from "./tasks-reducer";
import {AppThunkDispatch} from "../../app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index != -1)
                state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({...action.payload.todolist,filter:'all',entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
       // const newState = state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
       //      state = newState
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1)
                state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1)
                state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1)
                state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl,filter:'all',entityStatus:'idle'}))
        },
        clearDataAC(state) {
            state = []
        }
    }
})
 export const todolistsReducer = slice.reducer
export const {removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    setTodolistsAC,
    clearDataAC} = slice.actions

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({ todolists:res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return res.data
            })
            .then((todos) => {
                todos.forEach((tl) => {
                    dispatch(fetchTasksTC(tl.id))
                })

            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        //?????????????? ???????????????????? ???????????? ????????????????????, ?????????? ???????????? ???????????? ????????????????
        dispatch(setAppStatusAC({status: 'loading'}))
        //?????????????? ???????????? ?????????????????????? ??????????????????, ?????????? ???? ?????? ?????????????????????? ?????? ????????
        dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id:todolistId}))
                //???????????? ?????????????????? ????????????????????, ?????? ?????????????????????? ???????????????? ??????????????????
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC({ todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({ id:id, title: title}))
            })
    }
}

// types
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
// export type ClearDataActionType = ReturnType<typeof clearDataAC>;
// type ActionsType =
//     | RemoveTodolistActionType
//     | AddTodolistActionType
//     | ReturnType<typeof changeTodolistTitleAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     | SetTodolistsActionType
//     | ReturnType<typeof changeTodolistEntityStatusAC>
//     | ClearDataActionType



