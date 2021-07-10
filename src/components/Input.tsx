import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type propsType = {
    callbackClick: (title: string) => void
}

export const Input = (props: propsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        console.log(newTaskTitle)
    }

    const onClickHandler = () => {
        props.callbackClick(newTaskTitle)
        setNewTaskTitle("")
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    return (
        <div>
            <input placeholder={"Add task..."}
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
    )
}

