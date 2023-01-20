import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";
import {removeTodolistAC} from "../todolists-reducer";



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

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({taskId:'2',todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {description:"",title:"CSS",status:0,priority:0,startDate:"",deadline:"",id:"1",todoListId:"",order:0,addedDate:""},
            {description:"",title:"JS",status:0,priority:0,startDate:"",deadline:"",id:"2",todoListId:"",order:0,addedDate:""},
            {description:"",title:"React",status:0,priority:0,startDate:"",deadline:"",id:"3",todoListId:"",order:0,addedDate:""}
        ],
        'todolistId2': [
            {description:"",title:"bread",status:0,priority:0,startDate:"",deadline:"",id:"1",todoListId:"",order:0,addedDate:""},
            {description:"",title:"tea",status:0,priority:0,startDate:"",deadline:"",id:"3",todoListId:"",order:0,addedDate:""}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC(
        {description:"",
            title:"Juce",
            status:0,
            priority:0,
            startDate:"",
            deadline:"",
            id:"4",
            todoListId:'todolistId2',
            order:0,
            addedDate:""}
    )
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('Juce')
    expect(endState['todolistId2'][0].status).toBe(0)
    expect(endState['todolistId2'][3].title).toBe('tea')
})



test('title of specified task should be changed', () => {
    const action1 = updateTaskAC({taskId:'3',model:{title:'coffee'}, todolistId:'todolistId2'})
    const action2 = updateTaskAC({taskId:'1',model:{title:'Go'}, todolistId:'todolistId1'})

    const endState1 = tasksReducer(startState, action1)
    const endState2 = tasksReducer(startState, action2)

    expect(endState1['todolistId2'][2].title).toBe('coffee')
    expect(endState2['todolistId1'][0].title).toBe('Go')
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC({id:'todolistId2'})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})