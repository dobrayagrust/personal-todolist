import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {ItemForm} from "./components/Input/InputForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
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

export const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "Reading list", filter: 'all'},
        {id: todolistID2, title: "What to learn", filter: 'all'},
    ])

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
    })

    const addNewTask = (title: string, todolistID: string) => {
        setTasks({
            ...tasks, [todolistID]:
                [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]
        })
    }
    const removeTask = (taskID: string, todolistID: string) => {
        setTasks({
            ...tasks, [todolistID]:
                tasks[todolistID].filter(task => task.id !== taskID)
        })
    }
    const updateTaskTitle = (title: string, todolistID: string, taskID: string) => {
        setTasks({
            ...tasks, [todolistID]:
                tasks[todolistID].map(task => task.id === taskID ? {...task, title} : task)
        })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        setTasks({
            ...tasks, [todolistID]:
                tasks[todolistID].map(task => task.id === taskID ? {...task, isDone} : task)
        })
    }
    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(td => td.id === todolistID ? {...td, filter: value} : td))
    }
    const addTodolist = (title: string) => {
        let newTodolistID = v1()
        setTodolists([...todolists, {id: newTodolistID, title, filter: "all"}])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const updateTodolistTitle = (title: string, todolistID: string) => {
        setTodolists(todolists.map(td => td.id === todolistID ? {...td, title} : td))
    }
    const removeTodolist = (todolistID: string) => {
        const filteredTodolist = todolists.filter(td => td.id !== todolistID)
        setTodolists(filteredTodolist)
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    /*
    const addTodolist = (title: string) => {
        const todolist: any = {id: v1(), title, filter: "all"}
        setTodolists([...todolists, todolist])
        setTasks({...tasks, [todolist.id]: []})
    }
*/

    /*
        let [filter, setFilter] = useState<FilterValuesType>("all");
                let priorityTasks = tasks;

                if (filter === "active") {
                    priorityTasks = tasks.filter(task => !task.isDone);
                }
                if (filter === "completed") {
                    priorityTasks = tasks.filter(task => task.isDone);
        }
    */
    return (
        <div className="App">
            <ItemForm addItem={addTodolist}/>
            {
                todolists.map(td => {
                    let priorityTasks = tasks[td.id]
                    if (td.filter === "active") {
                        priorityTasks = tasks[td.id].filter(task => !task.isDone)
                    }
                    if (td.filter === "completed") {
                        priorityTasks = tasks[td.id].filter(task => task.isDone)
                    }
                    return (
                        <Todolist
                            key={td.id}
                            todolistID={td.id}
                            title={td.title}
                            tasks={priorityTasks}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeFilter={changeFilter}
                            addNewTask={addNewTask}
                            filter={td.filter}
                            updateTodolistTitle={updateTodolistTitle}
                            updateTaskTitle={updateTaskTitle}
                            removeTodolist={removeTodolist}
                            addTodolist={addTodolist}
                        />
                    )
                })}
        </div>
    )
}
