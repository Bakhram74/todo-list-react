import {v1} from "uuid";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAT,
    RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {TodoListType} from "../App";


test('Correct todolist should be removed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodoListType[] = [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ]

    const EndState = todoListsReducer(StartState,RemoveTodoListAC(todoListId_1))
    expect(EndState.length).toBe(1)
    expect(EndState[0].title).toBe("What to buy")
    expect(EndState[0].id).toBe(todoListId_2)

})

test('Correct todolist should be added',()=>{
    const newTitle = "New todolist"
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const todoListId_3 = v1()

    const StartState:TodoListType[] = [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ]

    const EndState = todoListsReducer(StartState,AddTodoListAC(newTitle,todoListId_3))
    expect(EndState.length).toBe(3)
    expect(EndState[0].title).toBe("New todolist")
    expect(EndState[0].id).toBe(todoListId_3)

})

test('Correct todolist or filter should be changed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodoListType[] = [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ]
const newFilter = "completed"

    const EndState = todoListsReducer(StartState,ChangeTodoListFilterAC(newFilter,todoListId_2))
    expect(EndState[0].filter).toBe("all")
    expect(EndState[1].filter).toBe(newFilter)

})

test('Correct todolists title should be changed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodoListType[] = [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ]
    const newTitle = "New todolist"

    const EndState = todoListsReducer(StartState,ChangeTodoListTitleAT(newTitle,todoListId_2))
    expect(EndState[0].title).toBe("What to learn")
    expect(EndState[1].title).toBe(newTitle)

})