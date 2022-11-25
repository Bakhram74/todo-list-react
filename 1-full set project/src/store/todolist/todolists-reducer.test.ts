import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {TasksStateType, TodoListType} from "../../App";
import {tasksReducer} from "../tasks/tasks_reducer";


test('Correct todolist should be removed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodoListType[] = [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ]

    const EndState = todoListsReducer(StartState,removeTodoListAC(todoListId_1))
    expect(EndState.length).toBe(1)
    expect(EndState[0].title).toBe("What to buy")
    expect(EndState[0].id).toBe(todoListId_2)

})

test('Correct todolist should be added',()=>{
    const newTitle = "New todolist"
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const StartState:TodoListType[] = [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ]

    const EndState = todoListsReducer(StartState,addTodoListAC(newTitle))
    expect(EndState.length).toBe(3)
    expect(EndState[0].title).toBe("New todolist")
})

test('Correct todolist or filter should be changed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodoListType[] = [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ]
const newFilter = "completed"

    const EndState = todoListsReducer(StartState,changeTodoListFilterAC(newFilter,todoListId_2))
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

    const EndState = todoListsReducer(StartState,changeTodoListTitleAC(newTitle,todoListId_2))
    expect(EndState[0].title).toBe("What to learn")
    expect(EndState[1].title).toBe(newTitle)

})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
    const action = addTodoListAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})
