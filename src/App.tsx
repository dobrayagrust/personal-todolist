import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "Reading list", filter: 'all'},
        {id: todolistID2, title: "What to learn", filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "1984", isDone: true},
            {id: v1(), title: "The Financier", isDone: true},
            {id: v1(), title: "The Stoic", isDone: true},
            {id: v1(), title: "The Titan", isDone: true},
            {id: v1(), title: "The Double", isDone: true},
            {id: v1(), title: "The Master and Margarita", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ],
    });

    const addNewTask = (title: string, todolistsID: string) => {
        setTasks({...tasks, [todolistsID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistsID]]})
        // let newTask = {id: v1(), title: title, isDone: false};
        // setTasks([newTask, ...tasks])
    }

    function removeTask(taskID: string, todolistsID: string) {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].filter(task => task.id !== taskID)})
        // let filteredTasks = tasks.filter(task => task.id !== id);
        // setTasks(filteredTasks);
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");

/*        let priorityTasks = tasks;

        if (filter === "active") {
            priorityTasks = tasks.filter(task => !task.isDone);
        }
        if (filter === "completed") {
            priorityTasks = tasks.filter(task => task.isDone);
}*/

    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(td => td.id === todolistID ? {...td, filter: value} : td))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistsID: string) => {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].map(task => task.id === taskID ? {...task, isDone} : task)})
    }

return (
    <div className="App">
        {
            todolists.map(td => {
                let priorityTasks = tasks[td.id];

                if (td.filter === "active") {
                    priorityTasks = tasks[td.id].filter(task => !task.isDone);
                }
                if (td.filter === "completed") {
                    priorityTasks = tasks[td.id].filter(task => task.isDone);
                }
                return (
                    <Todolist
                        key={td.id}
                        todolistsID={td.id}
                        title={td.title}
                        tasks={priorityTasks}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeFilter}
                        addNewTask={addNewTask}
                        filter={td.filter}
                    />
                )
            })}
    </div>
);
}


export default App;