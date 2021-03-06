import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistID: string,
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistID: string,
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todolistID: string,
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistID: string,
    filter: FilterValuesType,
}
export type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(td => td.id !== action.todolistID);
        case ADD_TODOLIST:
            return [...state, {id: action.todolistID, title: action.title, filter: "all"}]
        case CHANGE_TODOLIST_TITLE: {
            const todolist = state.find(tl => tl.id === action.todolistID);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case CHANGE_TODOLIST_FILTER: {
            const todolist = state.find(tl => tl.id === action.todolistID);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            // throw new Error("I don't understand this type")
            return state
    }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: REMOVE_TODOLIST,
        todolistID,
    }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: ADD_TODOLIST,
        title,
        todolistID: v1(),
    }
}
export const ChangeTodolistTitleAC = (title: string, todolistID: string): ChangeTodolistTitleActionType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        title,
        todolistID,
    }
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        todolistID,
        filter,
    }
}




