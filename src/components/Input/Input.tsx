import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from "./Input.module.css";

export type propsType = {
    newTaskTitle: string
    setNewTaskTitle: (newTaskTitle: string) => void
    addNewTask: (newTaskTitle: string, todolistID: string) => void
    // callbackClick: (title: string) => void
    todolistID: string
}

export const Input = (props: propsType) => {

    // let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setNewTaskTitle(event.currentTarget.value)
        console.log(props.newTaskTitle)
    }

    const addTask = () => {
        if (props.newTaskTitle.trim() !== "") {
            props.addNewTask(props.newTaskTitle, props.todolistID)
            props.setNewTaskTitle("")
        }

        /*else {
            setError("Title is required!")
        }*/
    }

    /*    const onClickHandler = () => {
            props.callbackClick(props.newTaskTitle)
            props.setNewTaskTitle("")
        }*/

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input placeholder={"Add task..."}
                   // value={props.newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                // className={error ? classes.error : ''}

            />
            {/*<button onClick={onClickHandler}>+</button>*/}
        </div>
    )
}

