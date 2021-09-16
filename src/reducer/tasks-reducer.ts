import {TasksType} from "../App";
import {ADD_TODOLIST, REMOVE_TODOLIST, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistID: string,
    taskID: string,
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistID: string,
    title: string,
}
export type ChangeTaskStatusAtionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistID: string,
    taskID: string,
    title: string,
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolistID: string,
    title: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusAtionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType ;

export const tasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
        case ADD_TASK:
            return {...state, [action.todolistID]: [{id: '1', title: action.title, isDone: false}, ...state[action.todolistID]]}
        case CHANGE_TASK_STATUS: {
            let copyState = {...state}
            let task = copyState[action.todolistID].find(td => td.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
                return copyState
            }
            return state
        }
        case CHANGE_TASK_TITLE: {
            let copyState = {...state}
            let task = copyState[action.todolistID].find(td => td.id === action.taskID)
            if (task) {
                task.title = action.title
                return copyState
            }
            return state
        }
        case ADD_TODOLIST:
            return {...state, [action.todolistID]: []}
        case REMOVE_TODOLIST: {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: REMOVE_TASK,
        todolistID,
        taskID,
    }
}
export const addTaskAC = (todolistID: string, title: string): AddTaskActionType => {
    return {
        type: ADD_TASK,
        todolistID,
        title,
    }
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusAtionType => {
    return {
        type: CHANGE_TASK_STATUS,
        todolistID,
        taskID,
        isDone,
    }
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: CHANGE_TASK_TITLE,
        todolistID,
        taskID,
        title,
    }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: ADD_TODOLIST,
        todolistID: v1(),
        title,
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return  {
        type: REMOVE_TODOLIST,
        todolistID,
    }
}

