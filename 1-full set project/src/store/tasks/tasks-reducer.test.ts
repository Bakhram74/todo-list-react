import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks_reducer";
import {TasksStateType} from "../../App";
import {removeTodoListAC} from "../todolist/todolists-reducer";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juce', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].isDone).toBe(false)
    expect(endState['todolistId2'][2].title).toBe('tea')
})

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {
    const action1 = changeTaskTitleAC('3', 'coffee', 'todolistId2')
    const action2 = changeTaskTitleAC('1', 'Go', 'todolistId1')

    const endState1 = tasksReducer(startState, action1)
    const endState2 = tasksReducer(startState, action2)

    expect(endState1['todolistId2'][1].title).toBe('coffee')
    expect(endState2['todolistId1'][0].title).toBe('Go')
})

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
