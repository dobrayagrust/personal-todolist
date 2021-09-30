import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {ItemForm} from "./components/Input/InputForm";
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTodolistAC,
} from "./reducer/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC} from "./reducer/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducer/store";

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

export const AppWithRedux = React.memo(() => {
    console.log("App")

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    const dispatch = useDispatch();

    const addNewTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(todolistID, title))
    },[dispatch])
    const removeTask = useCallback((taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    },[dispatch])
    const updateTaskTitle = useCallback((title: string, todolistID: string, taskID: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    },[dispatch])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    },[dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(ChangeTodolistFilterAC(value, todolistID))
    },[dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])
    const updateTodolistTitle = useCallback((title: string, todolistID: string) => {
        dispatch(ChangeTodolistTitleAC(title, todolistID))
    },[dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    },[dispatch])

    return (
        <div className="App">
            <ItemForm addItem={addTodolist}/>
            {
                todolists.map(td => {
                    let priorityTasks = tasks[td.id]
                    // if (td.filter === "active") {
                    //     priorityTasks = tasks[td.id].filter(task => !task.isDone)
                    // }
                    // if (td.filter === "completed") {
                    //     priorityTasks = tasks[td.id].filter(task => task.isDone)
                    // }
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
})
