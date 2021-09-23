import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistType> = []

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, title: "Reading list", filter: 'all'},
        {id: todolistID2, title: "What to learn", filter: 'all'},
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID2))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID1);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[0].title).toBe('Reading list');
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(newTodolistTitle, todolistID2));

    expect(endState[0].title).toBe("Reading list");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(newFilter, todolistID2));

    expect(endState[0].filter).toBe("all");
    //
    expect(endState[1].filter).toBe('completed');
});
