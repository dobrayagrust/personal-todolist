import React from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const callbackHandlerAll = () => {
        props.changeFilter("all")
    }
    const callbackHandlerActive = () => {
        props.changeFilter("active")
    }
    const callbackHandlerCompleted = () => {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <Input callbackClick={(title: string) => props.addNewTask(title)}/>
        <ul>
            {props.tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <Button value={'x'} callbackClick={() => {
                            props.removeTask(task.id)
                        }}/>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                    </li>)
            })}
        </ul>

        <div>
            <Button value={'All'} callbackClick={callbackHandlerAll}/>
            <Button value={'Active'} callbackClick={callbackHandlerActive}/>
            <Button value={'Completed'} callbackClick={callbackHandlerCompleted}/>
        </div>
    </div>
}