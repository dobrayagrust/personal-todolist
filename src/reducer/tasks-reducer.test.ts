import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTodolistAC,
    tasksReducer
} from './tasks-reducer';
import {TasksType} from "../App";

test('correct task should be deleted from correct array', () => {

    const startState: TasksType = {
        "todolistID1": [
            {id: '1', title: "1984", isDone: true},
            {id: '2', title: "The Financier", isDone: true},
            {id: '3', title: "The Stoic", isDone: true},
            {id: '4', title: "The Titan", isDone: true},
            {id: '5', title: "The Double", isDone: true},
            {id: '6', title: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ]
    };

    // const action = removeTaskAC("todolistID2", '2');

    const endState = tasksReducer(startState, removeTaskAC('todolistID2', '2'))

    expect(endState).toEqual({
        "todolistID1": [
            {id: '1', title: "1984", isDone: true},
            {id: '2', title: "The Financier", isDone: true},
            {id: '3', title: "The Stoic", isDone: true},
            {id: '4', title: "The Titan", isDone: true},
            {id: '5', title: "The Double", isDone: true},
            {id: '6', title: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            // {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ]
    });
});


test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        "todolistID1": [
            {id: '1', title: "1984", isDone: true},
            {id: '2', title: "The Financier", isDone: true},
            {id: '3', title: "The Stoic", isDone: true},
            {id: '4', title: "The Titan", isDone: true},
            {id: '5', title: "The Double", isDone: true},
            {id: '6', title: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ]
    };

    // const action = addTaskAC("juice", "todolistId2");

    const endState = tasksReducer(startState, addTaskAC('todolistID2', 'juice'))

    expect(endState["todolistID1"].length).toBe(6);
    expect(endState["todolistID2"].length).toBe(6);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe('juice');
    expect(endState["todolistID2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: TasksType = {
        "todolistID1": [
            {id: '1', title: "1984", isDone: true},
            {id: '2', title: "The Financier", isDone: true},
            {id: '3', title: "The Stoic", isDone: true},
            {id: '4', title: "The Titan", isDone: true},
            {id: '5', title: "The Double", isDone: true},
            {id: '6', title: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ]
    };

    // const action = changeTaskStatusAC("todolistId2", '2', false);

    const endState = tasksReducer(startState, changeTaskStatusAC("todolistID2", "2", false))

    expect(endState["todolistID2"][1].isDone).toBe(false);
    // expect(endState["todolistID2"][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {
    const startState: TasksType = {
        "todolistID1": [
            {id: '1', title: "1984", isDone: true},
            {id: '2', title: "The Financier", isDone: true},
            {id: '3', title: "The Stoic", isDone: true},
            {id: '4', title: "The Titan", isDone: true},
            {id: '5', title: "The Double", isDone: true},
            {id: '6', title: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ]
    };

    const endState = tasksReducer(startState, changeTaskTitleAC("todolistID2", "2", "xxx"))

    expect(endState["todolistID2"][1].title).toBe("xxx");
    expect(endState["todolistID2"][1].isDone).toBe(true);
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        "todolistID1": [
            {id: '1', title: "1984", isDone: true},
            {id: '2', title: "The Financier", isDone: true},
            {id: '3', title: "The Stoic", isDone: true},
            {id: '4', title: "The Titan", isDone: true},
            {id: '5', title: "The Double", isDone: true},
            {id: '6', title: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ]
    };

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistID1" && k !== "todolistID2");
    if (!newKey) {
        throw new Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        "todolistID1": [
            {id: '1', title: "1984", isDone: true},
            {id: '2', title: "The Financier", isDone: true},
            {id: '3', title: "The Stoic", isDone: true},
            {id: '4', title: "The Titan", isDone: true},
            {id: '5', title: "The Double", isDone: true},
            {id: '6', title: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ]
    };

    const action = removeTodolistAC("todolistID2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistID2"]).not.toBeDefined();
});


