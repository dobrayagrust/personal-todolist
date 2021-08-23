import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";

/*type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistsID: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistsID: string) => void
    addNewTask: (title: string, todolistsID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistsID: string) => void
    filter: FilterValuesType
    todolistsID: string
}

export const Todolist = React.memo((props: TodoListType) => {

/*    const callbackHandlerAll = () => {
        props.changeFilter("all", props.todolistsID)
    }
    const callbackHandlerActive = () => {
        props.changeFilter("active", props.todolistsID)
    }
    const callbackHandlerCompleted = () => {
        props.changeFilter("completed", props.todolistsID)
    }*/

    const universalHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue, props.todolistsID)
    }

    let [newTaskTitle, setNewTaskTitle] = useState("")

    return (
        <div>
            <h3>{props.title}</h3>
            <Input newTaskTitle={newTaskTitle}
                   setNewTaskTitle={setNewTaskTitle}
                   addNewTask={props.addNewTask}
                   todolistID={props.todolistsID}
            />
            {/*<Input callbackClick={(newTaskTitle: string) => props.addNewTask(newTaskTitle, props.todolistsID)}/>*/}
            <Button buttonTitle={"+"} callback={() => {props.addNewTask(newTaskTitle, props.todolistsID)}}/>
            <ul>
                {props.tasks.map((task) => {

                    const removeTaskHandler = () => {
                        props.removeTask(task.id, props.todolistsID)
                    }

                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, event.currentTarget.checked, props.todolistsID)
                    }

                    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
                       if (event.key === "Enter") {
                           props.addNewTask(props.title, props.todolistsID)
                       }
                    }
                    return (
                        <li key={task.id}>
                            <Button buttonTitle={'X'}
                                    callback={removeTaskHandler}
                                    // onChange={() => {alert("Click")}}
                            />
                            {/*<Input callbackClick={() => {}}/>*/}
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={task.isDone}
                                   onKeyPress={onKeyPressHandler}
                            />
                            <span>{task.title}</span>
                        </li>)
                })}
            </ul>
            <div>
                <Button buttonTitle={'All'}
                        callback={() => universalHandler('all')}
                        filter={props.filter}
                />
                <Button buttonTitle={'Active'}
                        callback={() => universalHandler('active')}
                        filter={props.filter}
                />
                <Button buttonTitle={'Completed'}
                        callback={() => universalHandler('completed')}
                        filter={props.filter}
                />
            </div>
        </div>
    )
})