import {v1} from "uuid";
import {TodolistType} from "../../../api/todolists-api";
import {tasksReducer, TasksStateType} from "../Task/tasks-reducer";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "../todolists-reducer";



test('Correct todolist should be removed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodolistDomainType[] = [
        {id: todoListId_1, title: "What to learn", addedDate:"", order:0,filter:"all",entityStatus:'idle'},
        {id: todoListId_2, title: "What to buy",addedDate:"", order:0,filter:"all",entityStatus:'idle'}
    ]

    const EndState = todolistsReducer(StartState,removeTodolistAC({id:todoListId_1}))
    expect(EndState.length).toBe(1)
    expect(EndState[0].title).toBe("What to buy")
    expect(EndState[0].id).toBe(todoListId_2)

})

test('Correct todolist should be added',()=>{
    const newTitle = "New todolist"
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const todoListId_3 = v1()


    const StartState:TodolistDomainType[] = [
        {id: todoListId_1, title: "What to learn",addedDate:"", order:0,filter:"all",entityStatus:'idle'},
        {id: todoListId_2, title: "What to buy", addedDate:"", order:0,filter:"all",entityStatus:'idle'}
    ]
    const EndState = todolistsReducer(StartState,addTodolistAC({
        todolist: {id: todoListId_3, title: newTitle, addedDate:"", order:0}
    }))
    expect(EndState.length).toBe(3)
    expect(EndState[0].title).toBe("New todolist")
})

test('Correct todolist  filter should be changed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodolistDomainType[] = [
        {id: todoListId_1, title: "What to learn",addedDate:"", order:0,filter:"all",entityStatus:'idle'},
        {id: todoListId_2, title: "What to buy",addedDate:"", order:0,filter:"all",entityStatus:'idle'}
    ]
    const newFilter = "completed"

    const EndState = todolistsReducer(StartState,changeTodolistFilterAC({id:todoListId_2,filter:newFilter }))
    expect(EndState[0].filter).toBe("all")
    expect(EndState[1].filter).toBe(newFilter)

})

test('Correct todolists title should be changed',()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const StartState:TodolistDomainType[] = [
        {id: todoListId_1, title: "What to learn",addedDate:"", order:0,filter:"all",entityStatus:'idle'},
        {id: todoListId_2, title: "What to buy",addedDate:"", order:0,filter:"all",entityStatus:'idle'}

    ]
    const newTitle = "New todolist"

    const EndState = todolistsReducer(StartState,changeTodolistTitleAC({title:newTitle,id:todoListId_2}))
    expect(EndState[0].title).toBe("What to learn")
    expect(EndState[1].title).toBe(newTitle)

})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [

            {description:"",title:"CSS",status:0,priority:0,startDate:"",deadline:"",id:"1",todoListId:"",order:0,addedDate:""},
            {description:"",title:"JS",status:0,priority:0,startDate:"",deadline:"",id:"2",todoListId:"",order:0,addedDate:""},
            {description:"",title:"React",status:0,priority:0,startDate:"",deadline:"",id:"3",todoListId:"",order:0,addedDate:""}
        ],
        'todolistId2': [
            {description:"",title:"bread",status:0,priority:0,startDate:"",deadline:"",id:"1",todoListId:"",order:0,addedDate:""},
            {description:"",title:"milk",status:0,priority:0,startDate:"",deadline:"",id:"2",todoListId:"",order:0,addedDate:""},
            {description:"",title:"tea",status:0,priority:0,startDate:"",deadline:"",id:"3",todoListId:"",order:0,addedDate:""}
        ]
    }
    const action = addTodolistAC({todolist:{id:"fddfdsd", title: "What to learn",addedDate:"", order:0}})

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
    const startTodoListsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({todolist:{id:"fddfdsd", title: "What to learn",addedDate:"", order:0}})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodoLists).toBe(action.payload.todolist.id)
})